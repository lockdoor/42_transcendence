#!/bin/sh

if [ -f "manage.py" ];
then
    echo found
else
    django-admin startproject transcendence .
    python manage.py startapp backend
    python manage.py startapp frontend
    python manage.py startapp chat
fi

if [ -f "db.sqlite3" ];
then
    echo Database is ready
else
    echo Create new database...
    python manage.py migrate
fi

python manage.py shell << EOF

#Clean Regenerate Code
from backend.models import RegenerateCode, PreRegister, ActivationCode
from django.contrib.sessions.models import Session

print("Clearing all state...")

#Clear expire regenration code for QR-code
regen_codes = RegenerateCode.objects.all()
for rc in regen_codes:
    if rc.is_expired():
        rc.delete()

#Clear PreRegister
pre_registers = PreRegister.objects.all()
for pr in pre_registers:
    ac = ActivationCode.objects.get(user=pr)
    if ac.is_expired():
        pr.delete()
        ac.delete()
        
#Clear Session
sessions = Session.objects.all()
sessions.delete()

print("All clean !")

EOF

exec "$@"