from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import sys

class Player():
	def __init__(self, name, x, y):
		self.player_name = name
		self.x = x
		self.y = y
		self.stat = "idle"

	def set_name(self, name):
		self.player_name = name

	def set_stat(self, stat):
		self.stat = stat

	def set_stat_idle(self):
		self.stat = "idle"

class Table():
	def __init__(self, width, height):
		self.width = width
		self.height = height

class Ball():
	def __init__(self, x, y):
		self.x = x
		self.y = y
		self.mx = 5
		self.my = 2

class GameData():
	def __init__(self):
		self.table = Table(200, 100)
		self.ball = Ball(self.table.width / 2, self.table.height / 2)
		self.player_one = Player("one", 0, self.table.height / 2)
		self.player_two = Player("two", self.table.width, self.table.height / 2)
		self.player_radius = 10 #percent paddle/table_height
		self.player_speed = 2

	def ball_move(self):
		self.ball.x += self.ball.mx
		self.ball.y += self.ball.my

		if self.ball.x > self.table.width or self.ball.x <= 0:
			self.ball.mx *= -1
		if self.ball.y > self.table.height or self.ball.y <= 0:
			self.ball.my *= -1

	def player_move(self):
		if self.player_one.stat == "right":
			self.player_one.y += self.player_speed
		if self.player_one.stat == "left":
			self.player_one.y -= self.player_speed
		if self.player_two.stat == "right":
			self.player_two.y -= self.player_speed
		if self.player_two.stat == "left":
			self.player_two.y += self.player_speed

	def player_idle(self):
		self.player_one.set_stat_idle()
		self.player_two.set_stat_idle()

	def select_player(self, player):
		if self.player_one.player_name == player:
			return self.player_one
		elif self.player_two.player_name == player:
			return self.player_two
		return None

	def to_dict(self):
		return {
			"table_width": self.table.width,
			"table_height": self.table.height,
			"ball_x": self.ball.x,
			"ball_y": self.ball.y,
			"player_radius": self.player_radius,
			"player_one_name": self.player_one.player_name,
			"player_one_x": self.player_one.x,
			"player_one_y": self.player_one.y,
			"player_two_name": self.player_two.player_name,
			"player_two_x": self.player_two.x,
			"player_two_y": self.player_two.y,
			"player_radius": self.player_radius,
		}

class PongConsumer(AsyncWebsocketConsumer):

	game = GameData()

	async def connect(self):
		self.user = self.scope['user'] #get user from section
		print(self.user.username, file=sys.stderr)
		self.player_1 = self.scope['url_route']['kwargs']['player1']
		self.player_2 = self.scope['url_route']['kwargs']['player2']
		self.chatroom_name = f'{self.player_1}_{self.player_2}'
		await self.accept()
		await self.channel_layer.group_add(self.chatroom_name, self.channel_name)
		#send_task should uniq
		if not hasattr(self.channel_layer, 'send_task'):
			self.game.player_one.set_name(self.player_1)
			self.game.player_two.set_name(self.player_2)
			self.channel_layer.send_task = asyncio.create_task(self.send_game_data())
		else:
			await self.send(text_data=json.dumps(self.game.to_dict()))

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(self.chatroom_name, self.channel_name)
		if not self.channel_layer.groups:
			self.channel_layer.send_task.cancel()
			del self.channel_layer.send_task

	async def send_game_data(self):
		try:
			while True:
				# print("hello", file=sys.stderr)
				self.game.ball_move()
				self.game.player_move()
				await self.channel_layer.group_send(
					self.chatroom_name,
					{
						'type': 'game_data',
						'data': self.game.to_dict()
					}
				)
				self.game.player_idle()
				await asyncio.sleep(1 / 12)  # 12 frames per second
		except asyncio.CancelledError:
			pass

	async def game_data(self, event):
		await self.send(text_data=json.dumps(event))

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		player = self.game.select_player(self.user.username)
		if player:
			print(text_data_json, file=sys.stderr)
			player.set_stat(text_data_json['move'])
			# Handle received data here (e.g., updating player positions)