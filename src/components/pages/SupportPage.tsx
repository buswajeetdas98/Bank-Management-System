import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LifeBuoy,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import Sidebar from "../dashboard/Sidebar";

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdated: string;
  category: string;
}

const SupportPage = () => {
  // Wrap the component in a layout similar to other pages
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <SupportContent />
      </div>
    </div>
  );
};

const SupportContent = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-001",
      subject: "Unable to transfer funds",
      status: "in-progress",
      priority: "high",
      createdDate: "2023-06-14",
      lastUpdated: "2023-06-15",
      category: "Technical Issue",
    },
    {
      id: "TKT-002",
      subject: "Question about account fees",
      status: "resolved",
      priority: "medium",
      createdDate: "2023-06-10",
      lastUpdated: "2023-06-12",
      category: "Account Inquiry",
    },
    {
      id: "TKT-003",
      subject: "Request for account statement",
      status: "closed",
      priority: "low",
      createdDate: "2023-06-05",
      lastUpdated: "2023-06-08",
      category: "Document Request",
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  const handleSubmitTicket = () => {
    if (
      !newTicket.subject ||
      !newTicket.category ||
      !newTicket.priority ||
      !newTicket.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const ticket: SupportTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      status: "open",
      priority: newTicket.priority as "low" | "medium" | "high" | "urgent",
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      category: newTicket.category,
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: "", category: "", priority: "", description: "" });
    setShowNewTicketForm(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open":
        return "default";
      case "in-progress":
        return "secondary";
      case "resolved":
        return "outline";
      case "closed":
        return "destructive";
      default:
        return "default";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "low":
        return "outline";
      case "medium":
        return "secondary";
      case "high":
        return "default";
      case "urgent":
        return "destructive";
      default:
        return "outline";
    }
  };

  const faqItems = [
    {
      question: "How do I transfer money between my accounts?",
      answer:
        "You can transfer money between your accounts by going to the Dashboard, selecting the account you want to transfer from, and clicking the 'Transfer' button. Enter the amount and select the destination account.",
    },
    {
      question: "What are the daily transaction limits?",
      answer:
        "Daily transaction limits vary by account type: Basic accounts have a $1,000 daily limit, Premium accounts have a $5,000 limit, and VIP accounts have a $10,000 limit.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "You can update your personal information by going to the Profile page and clicking the 'Edit Profile' button. Make your changes and click 'Save Changes' to update your information.",
    },
    {
      question: "What should I do if I suspect fraudulent activity?",
      answer:
        "If you suspect fraudulent activity on your account, immediately contact our security team at (555) 123-FRAUD or use the emergency contact option. We'll help secure your account and investigate the issue.",
    },
    {
      question: "How do I set up two-factor authentication?",
      answer:
        "You can enable two-factor authentication in the Settings page under Security Settings. Toggle the 'Two-Factor Authentication' switch and follow the setup instructions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LifeBuoy className="h-8 w-8" />
            Support Center
          </h1>
          <p className="text-gray-600 mt-1">
            Get help with your account and banking needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Phone Support</p>
                    <p className="text-sm text-blue-700">(555) 123-BANK</p>
                    <p className="text-xs text-blue-600">24/7 Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Email Support</p>
                    <p className="text-sm text-green-700">
                      support@bankingsystem.com
                    </p>
                    <p className="text-xs text-green-600">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">
                      Business Hours
                    </p>
                    <p className="text-sm text-orange-700">
                      Mon-Fri: 8AM-8PM EST
                    </p>
                    <p className="text-xs text-orange-600">
                      Sat-Sun: 9AM-5PM EST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600 mb-3">
                  For urgent security issues or suspected fraud:
                </p>
                <Button variant="destructive" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call (555) 123-FRAUD
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Support Tickets */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Support Tickets
                  </CardTitle>
                  <Button
                    onClick={() => setShowNewTicketForm(!showNewTicketForm)}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showNewTicketForm && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      Create New Support Ticket
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={newTicket.subject}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              subject: e.target.value,
                            })
                          }
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={newTicket.category}
                            onValueChange={(value) =>
                              setNewTicket({ ...newTicket, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical Issue">
                                Technical Issue
                              </SelectItem>
                              <SelectItem value="Account Inquiry">
                                Account Inquiry
                              </SelectItem>
                              <SelectItem value="Transaction Problem">
                                Transaction Problem
                              </SelectItem>
                              <SelectItem value="Document Request">
                                Document Request
                              </SelectItem>
                              <SelectItem value="Security Concern">
                                Security Concern
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority *</Label>
                          <Select
                            value={newTicket.priority}
                            onValueChange={(value) =>
                              setNewTicket({ ...newTicket, priority: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={newTicket.description}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              description: e.target.value,
                            })
                          }
                          placeholder="Please provide detailed information about your issue"
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSubmitTicket}>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Ticket
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowNewTicketForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{ticket.subject}</h4>
                            <p className="text-sm text-gray-600">
                              Ticket #{ticket.id}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                getStatusBadgeVariant(ticket.status) as any
                              }
                            >
                              {ticket.status.charAt(0).toUpperCase() +
                                ticket.status.slice(1)}
                            </Badge>
                            <Badge
                              variant={
                                getPriorityBadgeVariant(ticket.priority) as any
                              }
                            >
                              {ticket.priority.charAt(0).toUpperCase() +
                                ticket.priority.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>Category: {ticket.category}</span>
                          <span>
                            Last updated:{" "}
                            {new Date(ticket.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="text-gray-600">No support tickets found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
