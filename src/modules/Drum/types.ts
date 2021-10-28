export type TCompetitionAwardCategory = 'primary' | 'secondary';

export type TCompetitionPrizeFundMoneyAward = {
  type: 'money';
  currency: string;
  amount: number;
};

export type TCompetitionPrizeFundCommonAward = {
  type: 'common';
  title: string;
};

export type TCompetitionPrizeFundAward = TCompetitionPrizeFundMoneyAward | TCompetitionPrizeFundCommonAward;

export type TCompetitionPrizeFundDistributionMapItem = {
  position: number;
  category: TCompetitionAwardCategory;
  award: TCompetitionPrizeFundAward;
};

export type TCompetitionPrizeFundDistributionMap = Record<number, TCompetitionPrizeFundDistributionMapItem | undefined>;

export type TCompetitionResultsWinner = {
  id: number;
  name: string;
  country: string;
  points: number;
  position: number;
  schedule: {
    startingAt: number;
    stoppedAt: number;
    endedAt: number;
  };
  isMe: boolean;
};

export type TCompetitionResultsWinners = TCompetitionResultsWinner[];

export type TCompetitionResultsPlayer = {
  name: string;
  country: string;
  points: number;
};

export type TCompetitionResultsPlayers = TCompetitionResultsPlayer[];
