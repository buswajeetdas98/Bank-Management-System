import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
} from "lucide-react";

interface Account {
  id: string;
  type: string;
  balance: number;
  accountNumber: string;
  lastTransaction?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  status: "completed" | "pending" | "failed";
  description: string;
  accountNumber?: string;
  reference?: string;
}

interface AccountSummaryCardProps {
  account?: Account;
  accounts?: Account[];
  onTransactionComplete?: (
    transaction: Transaction,
    updatedAccount: Account,
  ) => void;
}

const AccountSummaryCard = ({
  account = {
    id: "1",
    type: "Savings Account",
    balance: 5280.42,
    accountNumber: "ACCT-12345",
    lastTransaction: "2023-06-15",
  },
  accounts = [],
  onTransactionComplete = () => {},
}: AccountSummaryCardProps) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    // Simulate deposit transaction
    const depositAmount = parseFloat(amount);
    const updatedAccount = {
      ...account,
      balance: account.balance + depositAmount,
    };

    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      description: `Deposit to ${account.type}`,
      amount: depositAmount,
      type: "deposit",
      status: "completed",
      accountNumber: account.accountNumber,
    };

    onTransactionComplete(transaction, updatedAccount);
    setAmount("");
    setIsDepositOpen(false);
  };

  const handleWithdraw = () => {
    if (
      !amount ||
      parseFloat(amount) <= 0 ||
      parseFloat(amount) > account.balance
    )
      return;

    // Simulate withdrawal transaction
    const withdrawAmount = parseFloat(amount);
    const updatedAccount = {
      ...account,
      balance: account.balance - withdrawAmount,
    };

    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      description: `Withdrawal from ${account.type}`,
      amount: withdrawAmount,
      type: "withdrawal",
      status: "completed",
      accountNumber: account.accountNumber,
    };

    onTransactionComplete(transaction, updatedAccount);
    setAmount("");
    setIsWithdrawOpen(false);
  };

  const handleTransfer = () => {
    if (
      !transferAccount ||
      !amount ||
      parseFloat(amount) <= 0 ||
      parseFloat(amount) > account.balance
    )
      return;

    // Simulate transfer transaction
    const transferAmount = parseFloat(amount);
    const updatedAccount = {
      ...account,
      balance: account.balance - transferAmount,
    };

    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      description: `Transfer to ${transferAccount}`,
      amount: transferAmount,
      type: "transfer",
      status: "completed",
      accountNumber: account.accountNumber,
      reference: transferAccount,
    };

    onTransactionComplete(transaction, updatedAccount);
    setAmount("");
    setTransferAccount("");
    setIsTransferOpen(false);
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-blue-600 font-medium">{account.type}</p>
            <CardTitle className="text-xl font-bold mt-1">
              {account.accountNumber}
            </CardTitle>
          </div>
          <CreditCard className="h-8 w-8 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-3xl font-bold">
              $
              {account.balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">
              Last transaction: {account.lastTransaction || "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4 px-6 border-t border-gray-100">
        {/* Deposit Dialog */}
        <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowDownLeft className="h-4 w-4" /> Deposit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit Funds</DialogTitle>
              <DialogDescription>
                Enter the amount you want to deposit into your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deposit-amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="deposit-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Confirm Deposit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Withdraw Dialog */}
        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowUpRight className="h-4 w-4" /> Withdraw
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Enter the amount you want to withdraw from your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="withdraw-amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleWithdraw}
                disabled={
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > account.balance
                }
              >
                Confirm Withdrawal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Transfer Dialog */}
        <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" /> Transfer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Funds</DialogTitle>
              <DialogDescription>
                Transfer money to another account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transfer-account" className="text-right">
                  To Account
                </Label>
                <Select
                  value={transferAccount}
                  onValueChange={setTransferAccount}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts
                      .filter((acc) => acc.id !== account.id)
                      .map((acc) => (
                        <SelectItem key={acc.id} value={acc.accountNumber}>
                          {acc.accountNumber} ({acc.type})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transfer-amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="transfer-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleTransfer}
                disabled={
                  !transferAccount ||
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > account.balance
                }
              >
                Confirm Transfer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AccountSummaryCard;
