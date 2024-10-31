class TeamColor:
    def __init__(self, primary_color_hex, secondary_color_hex):
        self.primary_color_hex = primary_color_hex
        self.secondary_color_hex = secondary_color_hex

    def __str__(self):
        return f"Primary Color: {self.primary_color_hex}, Secondary Color: {self.secondary_color_hex}"