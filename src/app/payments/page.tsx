'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Search,
  Calendar,
  Eye,
  Download,
  RefreshCw,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Building,
  Wallet,
  Receipt,
  Filter
} from 'lucide-react';

interface Payment {
  id: string;
  transactionId: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  partnerName: string;
  amount: number;
  currency: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Card' | 'Cash';
  gateway: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled';
  type: 'booking' | 'refund' | 'commission' | 'withdrawal';
  gatewayTransactionId?: string;
  processingFee: number;
  netAmount: number;
  createdAt: string;
  processedAt?: string;
  failureReason?: string;
  refundReason?: string;
  notes?: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      transactionId: 'TXN-2024-001',
      bookingNumber: 'AMG-2024-001',
      customerName: 'Ahmed Hassan',
      customerEmail: 'ahmed.hassan@email.com',
      partnerName: 'Royal Palace Hotel',
      amount: 15000,
      currency: 'BDT',
      paymentMethod: 'bKash',
      gateway: 'bKash API',
      status: 'completed',
      type: 'booking',
      gatewayTransactionId: 'BK202401150001',
      processingFee: 150,
      netAmount: 14850,
      createdAt: '2024-01-15T10:30:00Z',
      processedAt: '2024-01-15T10:31:30Z'
    },
    {
      id: '2',
      transactionId: 'TXN-2024-002',
      bookingNumber: 'AMG-2024-002',
      customerName: 'Fatima Rahman',
      customerEmail: 'fatima.rahman@email.com',
      partnerName: 'Adventure Tours BD',
      amount: 16000,
      currency: 'BDT',
      paymentMethod: 'Bank Transfer',
      gateway: 'Eastern Bank',
      status: 'completed',
      type: 'booking',
      gatewayTransactionId: 'EB2024011400245',
      processingFee: 50,
      netAmount: 15950,
      createdAt: '2024-01-14T14:20:00Z',
      processedAt: '2024-01-14T16:45:00Z'
    },
    {
      id: '3',
      transactionId: 'TXN-2024-003',
      bookingNumber: 'AMG-2024-003',
      customerName: 'Mohammad Ali',
      customerEmail: 'mohammad.ali@email.com',
      partnerName: 'Green Valley Resort',
      amount: 8500,
      currency: 'BDT',
      paymentMethod: 'Nagad',
      gateway: 'Nagad API',
      status: 'pending',
      type: 'booking',
      processingFee: 85,
      netAmount: 8415,
      createdAt: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      transactionId: 'TXN-2024-004',
      bookingNumber: 'AMG-2024-004',
      customerName: 'Rashida Begum',
      customerEmail: 'rashida.begum@email.com',
      partnerName: 'Taste of Bengal',
      amount: 4500,
      currency: 'BDT',
      paymentMethod: 'Card',
      gateway: 'SSLCOMMERZ',
      status: 'completed',
      type: 'booking',
      gatewayTransactionId: 'SSL2024011800567',
      processingFee: 90,
      netAmount: 4410,
      createdAt: '2024-01-12T18:30:00Z',
      processedAt: '2024-01-12T18:32:15Z'
    },
    {
      id: '5',
      transactionId: 'TXN-2024-005',
      bookingNumber: 'AMG-2024-005',
      customerName: 'Karim Uddin',
      customerEmail: 'karim.uddin@email.com',
      partnerName: 'City Express Transport',
      amount: 2500,
      currency: 'BDT',
      paymentMethod: 'bKash',
      gateway: 'bKash API',
      status: 'refunded',
      type: 'refund',
      gatewayTransactionId: 'BK202401110001',
      processingFee: 25,
      netAmount: 2475,
      createdAt: '2024-01-11T12:00:00Z',
      processedAt: '2024-01-24T08:30:00Z',
      refundReason: 'Customer cancelled due to emergency'
    },
    {
      id: '6',
      transactionId: 'TXN-2024-006',
      bookingNumber: 'AMG-2024-006',
      customerName: 'Sara Khan',
      customerEmail: 'sara.khan@email.com',
      partnerName: 'Beach Resort Chittagong',
      amount: 12000,
      currency: 'BDT',
      paymentMethod: 'Rocket',
      gateway: 'Rocket API',
      status: 'failed',
      type: 'booking',
      processingFee: 120,
      netAmount: 11880,
      createdAt: '2024-01-10T15:45:00Z',
      failureReason: 'Insufficient balance in customer account'
    },
    {
      id: '7',
      transactionId: 'COM-2024-001',
      bookingNumber: '-',
      customerName: '-',
      customerEmail: '-',
      partnerName: 'Royal Palace Hotel',
      amount: 2250,
      currency: 'BDT',
      paymentMethod: 'Bank Transfer',
      gateway: 'Manual Transfer',
      status: 'completed',
      type: 'commission',
      processingFee: 0,
      netAmount: 2250,
      createdAt: '2024-01-15T18:00:00Z',
      processedAt: '2024-01-15T18:00:00Z',
      notes: 'Commission payout for January bookings'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.gatewayTransactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod === methodFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesType;
  });

  // Summary stats
  const stats = {
    totalPayments: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    refunded: payments.filter(p => p.status === 'refunded').length,
    totalRevenue: payments.filter(p => p.status === 'completed' && p.type === 'booking').reduce((sum, p) => sum + p.amount, 0),
    totalRefunds: payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0),
    processingFees: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.processingFee, 0),
    pendingAmount: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'refund': return 'bg-red-100 text-red-800';
      case 'commission': return 'bg-green-100 text-green-800';
      case 'withdrawal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <ArrowDownRight className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Card': return <CreditCard className="h-4 w-4" />;
      case 'Cash': return <Wallet className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      
      <div className="w-full max-w-[95%] md:max-w-7xl mx-auto px-2 md:px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-sm md:text-base text-gray-600">Monitor and manage all payment transactions</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  ← Back to Admin
                </Button>
              </Link>
              <Button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline" 
                size="sm"
                className="text-xs md:text-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Payments</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalPayments}</p>
                </div>
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Failed</p>
                  <p className="text-xl font-bold text-red-600">{stats.failed}</p>
                </div>
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900">৳{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Refunds</p>
                  <p className="text-xl font-bold text-gray-900">৳{(stats.totalRefunds / 1000).toFixed(0)}K</p>
                </div>
                <TrendingDown className="h-5 w-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Proc. Fees</p>
                  <p className="text-xl font-bold text-gray-900">৳{stats.processingFees}</p>
                </div>
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending Amt.</p>
                  <p className="text-xl font-bold text-gray-900">৳{(stats.pendingAmount / 1000).toFixed(0)}K</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by transaction ID, booking, customer, or gateway reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="bKash">bKash</SelectItem>
              <SelectItem value="Nagad">Nagad</SelectItem>
              <SelectItem value="Rocket">Rocket</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payments ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Transaction</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Customer/Partner</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-blue-600">{payment.transactionId}</div>
                          <div className="text-sm text-gray-500">{payment.bookingNumber !== '-' ? payment.bookingNumber : 'Direct Transaction'}</div>
                          {payment.gatewayTransactionId && (
                            <div className="text-xs text-gray-400">Gateway: {payment.gatewayTransactionId}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="min-w-0">
                          {payment.type === 'commission' ? (
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {payment.partnerName}
                              </div>
                              <div className="text-sm text-gray-500">Commission Payout</div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {payment.customerName}
                              </div>
                              <div className="text-sm text-gray-500 truncate">{payment.customerEmail}</div>
                              <div className="text-xs text-gray-400">{payment.partnerName}</div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-gray-900">৳{payment.amount.toLocaleString()}</div>
                          {payment.processingFee > 0 && (
                            <div className="text-sm text-orange-600">
                              Fee: ৳{payment.processingFee}
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            Net: ৳{payment.netAmount.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <div>
                            <div className="text-sm font-medium">{payment.paymentMethod}</div>
                            <div className="text-xs text-gray-500">{payment.gateway}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getTypeColor(payment.type)} w-fit capitalize`}>
                          {payment.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>
                          <div>{new Date(payment.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs">
                            {new Date(payment.createdAt).toLocaleTimeString()}
                          </div>
                          {payment.processedAt && (
                            <div className="text-xs text-green-600">
                              Processed: {new Date(payment.processedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setIsDetailDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.status === 'pending' && (
                            <Button variant="outline" size="sm" className="text-xs">
                              Process
                            </Button>
                          )}
                          {payment.status === 'completed' && payment.type === 'booking' && (
                            <Button variant="outline" size="sm" className="text-xs">
                              Refund
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payment Details: {selectedPayment?.transactionId}</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                {/* Transaction Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Transaction Information</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <Label className="text-sm text-gray-600">Transaction ID</Label>
                      <p className="font-medium">{selectedPayment.transactionId}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Booking Number</Label>
                      <p className="font-medium">{selectedPayment.bookingNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Gateway Transaction ID</Label>
                      <p className="font-medium">{selectedPayment.gatewayTransactionId || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Gateway</Label>
                      <p className="font-medium">{selectedPayment.gateway}</p>
                    </div>
                  </div>
                </div>

                {/* Customer/Partner Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    {selectedPayment.type === 'commission' ? 'Partner Information' : 'Customer Information'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    {selectedPayment.type === 'commission' ? (
                      <>
                        <div>
                          <Label className="text-sm text-gray-600">Partner Name</Label>
                          <p className="font-medium">{selectedPayment.partnerName}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Payment Type</Label>
                          <p className="font-medium">Commission Payout</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label className="text-sm text-gray-600">Customer Name</Label>
                          <p className="font-medium">{selectedPayment.customerName}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Customer Email</Label>
                          <p className="font-medium">{selectedPayment.customerEmail}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Service Provider</Label>
                          <p className="font-medium">{selectedPayment.partnerName}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <Label className="text-sm text-gray-600">Amount</Label>
                      <p className="font-medium text-xl">৳{selectedPayment.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Processing Fee</Label>
                      <p className="font-medium text-orange-600">৳{selectedPayment.processingFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Net Amount</Label>
                      <p className="font-medium text-green-600">৳{selectedPayment.netAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Currency</Label>
                      <p className="font-medium">{selectedPayment.currency}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Payment Method</Label>
                      <p className="font-medium">{selectedPayment.paymentMethod}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Transaction Type</Label>
                      <Badge className={`${getTypeColor(selectedPayment.type)} w-fit capitalize`}>
                        {selectedPayment.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Status Information</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <Label className="text-sm text-gray-600">Current Status</Label>
                      <Badge className={`${getStatusColor(selectedPayment.status)} flex items-center gap-1 w-fit mt-1`}>
                        {getStatusIcon(selectedPayment.status)}
                        {selectedPayment.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Created At</Label>
                      <p className="font-medium">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                    </div>
                    {selectedPayment.processedAt && (
                      <div>
                        <Label className="text-sm text-gray-600">Processed At</Label>
                        <p className="font-medium">{new Date(selectedPayment.processedAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Failure/Refund Information */}
                {(selectedPayment.failureReason || selectedPayment.refundReason) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Additional Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedPayment.failureReason && (
                        <div className="mb-2">
                          <Label className="text-sm text-gray-600">Failure Reason</Label>
                          <p className="text-red-700">{selectedPayment.failureReason}</p>
                        </div>
                      )}
                      {selectedPayment.refundReason && (
                        <div className="mb-2">
                          <Label className="text-sm text-gray-600">Refund Reason</Label>
                          <p className="text-purple-700">{selectedPayment.refundReason}</p>
                        </div>
                      )}
                      {selectedPayment.notes && (
                        <div>
                          <Label className="text-sm text-gray-600">Notes</Label>
                          <p className="text-gray-700">{selectedPayment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                    Close
                  </Button>
                  {selectedPayment.status === 'pending' && (
                    <Button>
                      Process Payment
                    </Button>
                  )}
                  {selectedPayment.status === 'completed' && selectedPayment.type === 'booking' && (
                    <Button variant="destructive">
                      Issue Refund
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
}