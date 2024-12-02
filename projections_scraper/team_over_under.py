class TeamOverUnder:
    def __init__(self, team_name, over_under_line):
        self.team_name = team_name
        self.over_under_line = over_under_line
        
    def __repr__(self):
        return f"{self.team_name} has an over/under line of {self.over_under_line}"