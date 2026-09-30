export interface DonationChannel {
  id: string;
  method: string;
  details: string;
  instructions?: string;
}

export const donationChannels: DonationChannel[] = [
  {
    id: "d1",
    method: "M-Pesa Paybill",
    details: "Paybill: 000000 · Account: ENOCHSOUTPOST",
    instructions: "Go to M-Pesa > Lipa na M-Pesa > Pay Bill, enter the numbers above.",
  },
  {
    id: "d2",
    method: "M-Pesa Till (Buy Goods)",
    details: "Till Number: 000000",
    instructions: "Go to M-Pesa > Lipa na M-Pesa > Buy Goods and Services.",
  },
  {
    id: "d3",
    method: "Bank Transfer",
    details: "Account Name: Enoch's Outpost Ministry · Bank: — · Account No: —",
    instructions: "Use your bank's mobile or branch transfer service.",
  },
  {
    id: "d4",
    method: "WhatsApp / Direct Contact",
    details: "+254110040420",
    instructions: "Message us directly to arrange a donation or ask questions about giving.",
  },
];
