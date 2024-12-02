class OverUnderPick:
    def __init__(self, team_name, name, pick):
        self.team_name = team_name
        self.name = name
        self.pick = pick
        
    def __repr__(self):
        return f"{self.team_name} - {self.name} - {self.pick}"