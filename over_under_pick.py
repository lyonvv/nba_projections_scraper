class OverUnderPick:
    def __init__(self, team_name, owen_pick, will_pick, lyon_pick):
        self.team_name = team_name
        self.owen_pick = owen_pick
        self.will_pick = will_pick
        self.lyon_pick = lyon_pick
        
    def __repr__(self):
        return f"{self.team_name}: Owen={self.owen_pick}, Will={self.will_pick}, Lyon={self.lyon_pick}"