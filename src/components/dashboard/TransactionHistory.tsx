import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  Tag,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  status: "completed" | "pending" | "failed";
  accountNumber: string;
  reference?: string;
}

interface TransactionHistoryProps {
  transactions?: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions: propTransactions,
}) => {
  // Use provided transactions or fall back to mock data
  const mockTransactions: Transaction[] = propTransactions || [
    {
      id: "1",
      date: new Date("2023-06-15"),
      description: "Salary Deposit",
      amount: 2500.0,
      type: "deposit",
      status: "completed",
      accountNumber: "1234567890",
    },
    {
      id: "2",
      date: new Date("2023-06-14"),
      description: "Grocery Shopping",
      amount: 150.75,
      type: "withdrawal",
      status: "completed",
      accountNumber: "1234567890",
    },
    {
      id: "3",
      date: new Date("2023-06-13"),
      description: "Transfer to Savings",
      amount: 500.0,
      type: "transfer",
      status: "completed",
      accountNumber: "1234567890",
      reference: "SAV-9876543210",
    },
    {
      id: "4",
      date: new Date("2023-06-12"),
      description: "Online Purchase",
      amount: 89.99,
      type: "withdrawal",
      status: "pending",
      accountNumber: "1234567890",
    },
    {
      id: "5",
      date: new Date("2023-06-10"),
      description: "ATM Withdrawal",
      amount: 200.0,
      type: "withdrawal",
      status: "completed",
      accountNumber: "1234567890",
    },
    {
      id: "6",
      date: new Date("2023-06-08"),
      description: "Bill Payment",
      amount: 120.5,
      type: "withdrawal",
      status: "failed",
      accountNumber: "1234567890",
    },
    {
      id: "7",
      date: new Date("2023-06-05"),
      description: "Interest Credit",
      amount: 12.33,
      type: "deposit",
      status: "completed",
      accountNumber: "1234567890",
    },
  ];

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const itemsPerPage = 5;

  // Filter transactions based on search term and filters
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm);
    const matchesType =
      typeFilter && typeFilter !== "all"
        ? transaction.type === typeFilter
        : true;
    const matchesStatus =
      statusFilter && statusFilter !== "all"
        ? transaction.status === statusFilter
        : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Handle transaction details view
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  // Get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  };

  // Get transaction type badge color
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "deposit":
        return "secondary";
      case "withdrawal":
        return "outline";
      case "transfer":
        return "default";
      default:
        return "default";
    }
  };

  // Get transaction type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <DollarSign className="h-4 w-4 text-red-500" />;
      case "transfer":
        return <Tag className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setStatusFilter("all");
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {format(transaction.date, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <Badge
                          variant={getTypeBadgeVariant(transaction.type) as any}
                        >
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span
                        className={
                          transaction.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "deposit" ? "+" : "-"} $
                        {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          getStatusBadgeVariant(transaction.status) as any
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(transaction)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8" />
                      <p>No transactions found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Transaction Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information about this transaction.
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-sm">
                      {format(selectedTransaction.date, "MMMM dd, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="text-sm">
                      {format(selectedTransaction.date, "hh:mm a")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Transaction ID
                    </p>
                    <p className="text-sm">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Account Number
                    </p>
                    <p className="text-sm">
                      {selectedTransaction.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeIcon(selectedTransaction.type)}
                      <Badge
                        variant={
                          getTypeBadgeVariant(selectedTransaction.type) as any
                        }
                      >
                        {selectedTransaction.type.charAt(0).toUpperCase() +
                          selectedTransaction.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge
                      variant={
                        getStatusBadgeVariant(selectedTransaction.status) as any
                      }
                      className="mt-1"
                    >
                      {selectedTransaction.status.charAt(0).toUpperCase() +
                        selectedTransaction.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p
                      className={`text-sm font-medium ${selectedTransaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                    >
                      {selectedTransaction.type === "deposit" ? "+" : "-"} $
                      {selectedTransaction.amount.toFixed(2)}
                    </p>
                  </div>
                  {selectedTransaction.reference && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Reference
                      </p>
                      <p className="text-sm">{selectedTransaction.reference}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Description
                  </p>
                  <p className="text-sm">{selectedTransaction.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
