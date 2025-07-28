import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "./dashboard/Sidebar";
import AccountSummaryCard from "./dashboard/AccountSummaryCard";
import TransactionHistory from "./dashboard/TransactionHistory";
import NotificationsPanel from "./dashboard/NotificationsPanel";
import { Bell, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

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

const Home = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data for accounts with state management
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      type: "Savings Account",
      balance: 12500.75,
      accountNumber: "1234-5678-9012-3456",
      lastTransaction: "2023-06-15",
    },
    {
      id: "2",
      type: "Checking Account",
      balance: 4750.25,
      accountNumber: "9876-5432-1098-7654",
      lastTransaction: "2023-06-14",
    },
    {
      id: "3",
      type: "Investment Account",
      balance: 35000.0,
      accountNumber: "5678-1234-5678-9012",
      lastTransaction: "2023-06-13",
    },
  ]);

  // Mock data for transactions with state management
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2023-06-15",
      amount: 500.0,
      type: "deposit",
      status: "completed",
      description: "Salary deposit",
      accountNumber: "1234-5678-9012-3456",
    },
    {
      id: "2",
      date: "2023-06-14",
      amount: 120.5,
      type: "withdrawal",
      status: "completed",
      description: "ATM withdrawal",
      accountNumber: "9876-5432-1098-7654",
    },
    {
      id: "3",
      date: "2023-06-13",
      amount: 1000.0,
      type: "transfer",
      status: "completed",
      description: "Transfer to savings",
      accountNumber: "1234-5678-9012-3456",
      reference: "5678-1234-5678-9012",
    },
    {
      id: "4",
      date: "2023-06-12",
      amount: 75.25,
      type: "withdrawal",
      status: "completed",
      description: "Online purchase",
      accountNumber: "9876-5432-1098-7654",
    },
    {
      id: "5",
      date: "2023-06-10",
      amount: 2500.0,
      type: "deposit",
      status: "completed",
      description: "Client payment",
      accountNumber: "5678-1234-5678-9012",
    },
    {
      id: "6",
      date: "2023-06-08",
      amount: 350.0,
      type: "transfer",
      status: "pending",
      description: "Transfer to investment account",
      accountNumber: "1234-5678-9012-3456",
      reference: "5678-1234-5678-9012",
    },
    {
      id: "7",
      date: "2023-06-05",
      amount: 180.0,
      type: "withdrawal",
      status: "failed",
      description: "Failed transaction",
      accountNumber: "9876-5432-1098-7654",
    },
  ]);

  // Mock notifications
  const notifications = [
    {
      id: "1",
      title: "Deposit Successful",
      message: "Your deposit of $500.00 has been processed successfully.",
      date: "2023-06-15",
      read: false,
      type: "transaction",
    },
    {
      id: "2",
      title: "Security Alert",
      message:
        "A new device was used to access your account. Please verify this was you.",
      date: "2023-06-14",
      read: false,
      type: "security",
    },
    {
      id: "3",
      title: "Transfer Pending",
      message: "Your transfer of $350.00 is pending approval.",
      date: "2023-06-08",
      read: true,
      type: "transaction",
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleTransactionComplete = (
    newTransaction: Transaction,
    updatedAccount: Account,
  ) => {
    // Update transactions state
    setTransactions((prev) => [newTransaction, ...prev]);

    // Update accounts state
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc)),
    );

    // Trigger refresh of components
    setRefreshKey((prev) => prev + 1);
  };

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  // Calculate recent activity stats
  const recentTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return transactionDate >= thirtyDaysAgo;
  });

  const monthlyIncome = recentTransactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = recentTransactions
    .filter(
      (t) =>
        (t.type === "withdrawal" || t.type === "transfer") &&
        t.status === "completed",
    )
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleNotifications}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {/* Overview Stats */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">
                        Total Balance
                      </p>
                      <p className="text-2xl font-bold">
                        $
                        {totalBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-200" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">
                        Monthly Income
                      </p>
                      <p className="text-2xl font-bold">
                        $
                        {monthlyIncome.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-200" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">
                        Monthly Expenses
                      </p>
                      <p className="text-2xl font-bold">
                        $
                        {monthlyExpenses.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-200" />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Account Summary Cards */}
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Account Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <AccountSummaryCard
                  key={`${account.id}-${refreshKey}`}
                  account={account}
                  accounts={accounts}
                  onTransactionComplete={handleTransactionComplete}
                />
              ))}
            </div>
          </section>

          {/* Transaction History */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Transaction History
            </h2>
            <TransactionHistory key={refreshKey} transactions={transactions} />
          </section>
        </main>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={toggleNotifications}
      />
    </div>
  );
};

export default Home;
