import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { CreditCard, DollarSign, Calendar, FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PaymentPageProps {
    userRole: 'student' | 'teacher';
}

export default function PaymentPage({ userRole }: PaymentPageProps) {
    const { t } = useLanguage();

    const transactions = [
        { id: 'INV-001', date: '2025-09-01', description: 'Tuition Fee - Fall 2025', amount: 4500, status: 'paid' },
        { id: 'INV-002', date: '2025-10-15', description: 'Library Fee', amount: 150, status: 'paid' },
        { id: 'INV-003', date: '2026-01-15', description: 'Tuition Fee - Spring 2026', amount: 4500, status: 'pending' },
        { id: 'INV-004', date: '2026-02-01', description: 'Lab Material Fee', amount: 300, status: 'pending' },
    ];

    const totalDue = transactions
        .filter(t => t.status === 'pending')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 me-1" /> {t('payment.status.paid')}</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"><Clock className="w-3 h-3 me-1" /> {t('payment.status.pending')}</Badge>;
            case 'overdue':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><AlertCircle className="w-3 h-3 me-1" /> {t('payment.status.overdue')}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <Layout userRole={userRole}>
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">{t('payment.title')}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{t('payment.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Balance Card */}
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white lg:col-span-1">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                                    {t('payment.due')}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-blue-100 text-sm mb-1">{t('payment.totalDue')}</p>
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">${totalDue.toLocaleString()}</h3>
                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                    <CreditCard className="w-4 h-4 me-2" />
                                    {t('payment.payNow')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Methods / Quick Info */}
                    <Card className="border-0 shadow-sm lg:col-span-2">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg">{t('payment.paymentMethods')}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                        <span className="font-bold text-gray-500 text-xs">VISA</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">•••• 4242</p>
                                        <p className="text-xs text-gray-500">{t('payment.expires')} 12/28</p>
                                    </div>
                                </div>
                                <div className="p-4 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all text-gray-500 h-full min-h-[80px]">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-sm font-medium">{t('payment.addMethod')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction History */}
                <Card className="border-0 shadow-sm">
                    <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between">
                        <CardTitle className="text-base sm:text-lg">{t('payment.history')}</CardTitle>
                        <Button variant="outline" size="sm" className="text-xs">
                            <Download className="w-4 h-4 me-2" />
                            {t('payment.downloadStatement')}
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-start">{t('payment.invoice')}</TableHead>
                                        <TableHead className="text-start">{t('payment.date')}</TableHead>
                                        <TableHead className="text-start">{t('payment.description')}</TableHead>
                                        <TableHead className="text-start">{t('payment.amount')}</TableHead>
                                        <TableHead className="text-start">{t('payment.status')}</TableHead>
                                        <TableHead className="text-start">{t('payment.action')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium text-xs sm:text-sm">{transaction.id}</TableCell>
                                            <TableCell className="text-xs sm:text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {transaction.date}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs sm:text-sm">{transaction.description}</TableCell>
                                            <TableCell className="text-xs sm:text-sm font-medium">${transaction.amount.toLocaleString()}</TableCell>
                                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FileText className="w-4 h-4 text-gray-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
