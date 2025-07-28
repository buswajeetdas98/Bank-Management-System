import React, { useState } from "react";
import { Bell, Check, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "transaction" | "security";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NotificationsPanel = ({
  isOpen = false,
  onClose = () => {},
}: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "transaction",
      title: "Deposit Successful",
      message: "Your deposit of $500.00 has been processed successfully.",
      timestamp: "2023-06-15T10:30:00",
      read: false,
    },
    {
      id: "2",
      type: "security",
      title: "New Login Detected",
      message: "A new login was detected from Chicago, IL. Was this you?",
      timestamp: "2023-06-14T18:45:00",
      read: false,
    },
    {
      id: "3",
      type: "transaction",
      title: "Transfer Complete",
      message: "Your transfer of $250.00 to Account #4589 is complete.",
      timestamp: "2023-06-14T14:20:00",
      read: true,
    },
    {
      id: "4",
      type: "security",
      title: "Password Changed",
      message: "Your account password was changed successfully.",
      timestamp: "2023-06-13T09:15:00",
      read: true,
    },
    {
      id: "5",
      type: "transaction",
      title: "Withdrawal Processed",
      message: "Your withdrawal of $200.00 has been processed.",
      timestamp: "2023-06-12T16:30:00",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
      " at " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 border-l border-gray-200"
        >
          <Card className="h-full rounded-none border-0">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-blue-600 mr-2" />
                <CardTitle className="text-lg font-semibold">
                  Notifications
                </CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-64px)]">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            {notification.type === "transaction" ? (
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                              </div>
                            )}
                            <div>
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {formatDate(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 pl-11">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                    <Bell className="h-12 w-12 text-gray-300 mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">
                      No notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
