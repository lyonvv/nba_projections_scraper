class DailyTeamProjection:
    def __init__(self, date_retrieved, team_projections):
        self.date_retrieved = date_retrieved
        self.team_projections = team_projections
    
    def __repr__(self):
        return f"DailyTeamProjection: {self.team_projections}"

class TeamProjection:
    def __init__(self, date_retrieved, team_name, current_w, current_l, proj_w, proj_l, win_div, playoff, top6, playin, proj_seed, proj_draft, first_pick):
        self.date_retrieved = date_retrieved
        self.team_name = team_name # Team
        self.current_w = current_w  # Current Wins
        self.current_l = current_l
        self.proj_w = proj_w
        self.proj_l = proj_l
        self.win_div = win_div  # WIN DIV%
        self.playoff = playoff  # PLAYOFF%
        self.top6 = top6  # TOP6%
        self.playin = playin  # PLAYIN%
        self.proj_seed = proj_seed  # PROJ SEED
        self.proj_draft = proj_draft  # PROJ DRAFT
        self.first_pick = first_pick  # 1ST PICK%

    def __repr__(self):
        formatted_date = self.date_retrieved
        return f"{self.team_name} on {formatted_date}: Current W-L={self.current_w}-{self.current_l}, Proj W-L={self.proj_w}-{self.proj_l}, WIN DIV%={self.win_div}, PLAYOFF%={self.playoff}, TOP6%={self.top6}, PLAYIN%={self.playin}, PROJ SEED={self.proj_seed}, PROJ DRAFT={self.proj_draft}, 1ST PICK%={self.first_pick}"