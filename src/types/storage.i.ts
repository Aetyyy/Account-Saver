interface Storage {
  id: string;
  title: string;
  account: string;
  password: string;
  description: string;
  category: string;
  createdat: Date;
}

interface Account {
  id: string;
  title: string;
  account: string;
  password: string;
  description: string;
  userid: string;
  categoryid: string | null;
  category?: { name: string } | null;
  createdat: Date;
  updatedat: Date;
  deletedat: Date | null;
}

interface AccountData {
  title: string;
  id: string;
  account: string;
  password: string;
  description: string;
  userid: string;
  categoryid: string | null;
  createdat: Date;
  updatedat: Date;
  deletedat: Date | null;
}

export type { Storage, Account, AccountData };
