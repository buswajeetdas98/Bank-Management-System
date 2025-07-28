import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { CreditCard, Eye, Edit, Trash2, Plus, DollarSign } from "lucide-react";
import Sidebar from "../dashboard/Sidebar";

interface Account {
  id: string;
  type: string;
  balance: number;
  accountNumber: string;
  status: "active" | "inactive" | "closed";
  openedDate: string;
  interestRate?: number;
}

const AccountsPage = () => {
  // Wrap the component in a layout similar to other pages
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <AccountsContent />
      </div>
    </div>
  );
};

const AccountsContent = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      type: "Savings Account",
      balance: 12500.75,
      accountNumber: "1234-5678-9012-3456",
      status: "active",
      openedDate: "2022-01-15",
      interestRate: 2.5,
    },
    {
      id: "2",
      type: "Checking Account",
      balance: 4750.25,
      accountNumber: "9876-5432-1098-7654",
      status: "active",
      openedDate: "2021-08-20",
      interestRate: 0.1,
    },
    {
      id: "3",
      type: "Investment Account",
      balance: 35000.0,
      accountNumber: "5678-1234-5678-9012",
      status: "active",
      openedDate: "2020-03-10",
      interestRate: 4.2,
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newAccountType, setNewAccountType] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");

  const handleCreateAccount = () => {
    if (!newAccountType || !initialDeposit) return;

    const newAccount: Account = {
      id: (accounts.length + 1).toString(),
      type: newAccountType,
      balance: parseFloat(initialDeposit),
      accountNumber: generateAccountNumber(),
      status: "active",
      openedDate: new Date().toISOString().split("T")[0],
      interestRate: getInterestRate(newAccountType),
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountType("");
    setInitialDeposit("");
    setIsCreateOpen(false);
  };

  const generateAccountNumber = () => {
    return Array.from({ length: 4 }, () =>
      Math.floor(1000 + Math.random() * 9000),
    ).join("-");
  };

  const getInterestRate = (type: string) => {
    switch (type) {
      case "Savings Account":
        return 2.5;
      case "Checking Account":
        return 0.1;
      case "Investment Account":
        return 4.2;
      default:
        return 0;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "closed":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleViewAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsViewOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsEditOpen(true);
  };

  const handleCloseAccount = (accountId: string) => {
    setAccounts(
      accounts.map((account) =>
        account.id === accountId ? { ...account, status: "closed" } : account,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Accounts</h1>
            <p className="text-gray-600 mt-1">
              Manage your bank accounts and view account details
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>
                  Open a new bank account with an initial deposit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account-type" className="text-right">
                    Account Type
                  </Label>
                  <Select
                    value={newAccountType}
                    onValueChange={setNewAccountType}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings Account">
                        Savings Account
                      </SelectItem>
                      <SelectItem value="Checking Account">
                        Checking Account
                      </SelectItem>
                      <SelectItem value="Investment Account">
                        Investment Account
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="initial-deposit" className="text-right">
                    Initial Deposit
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <span className="mr-2">$</span>
                    <Input
                      id="initial-deposit"
                      type="number"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      placeholder="0.00"
                      min="25"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateAccount}
                  disabled={
                    !newAccountType ||
                    !initialDeposit ||
                    parseFloat(initialDeposit) < 25
                  }
                >
                  Create Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-blue-900">
                      {account.type}
                    </CardTitle>
                    <p className="text-sm text-blue-600 mt-1">
                      {account.accountNumber}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                    <Badge
                      variant={getStatusBadgeVariant(account.status) as any}
                      className="text-xs"
                    >
                      {account.status.charAt(0).toUpperCase() +
                        account.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      $
                      {account.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Opened</p>
                      <p className="font-medium">
                        {new Date(account.openedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Interest Rate</p>
                      <p className="font-medium">{account.interestRate}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewAccount(account)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditAccount(account)}
                      disabled={account.status === "closed"}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleCloseAccount(account.id)}
                      disabled={account.status === "closed"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Account Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Account Details</DialogTitle>
              <DialogDescription>
                Complete information about your account.
              </DialogDescription>
            </DialogHeader>
            {selectedAccount && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Account Type
                    </p>
                    <p className="text-sm">{selectedAccount.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Account Number
                    </p>
                    <p className="text-sm">{selectedAccount.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge
                      variant={
                        getStatusBadgeVariant(selectedAccount.status) as any
                      }
                      className="mt-1"
                    >
                      {selectedAccount.status.charAt(0).toUpperCase() +
                        selectedAccount.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Interest Rate
                    </p>
                    <p className="text-sm">{selectedAccount.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Opened Date
                    </p>
                    <p className="text-sm">
                      {new Date(
                        selectedAccount.openedDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Balance
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      $
                      {selectedAccount.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountsPage;
