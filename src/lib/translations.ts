// Simple translation mock for front-desk page
export const t = (key: string): string => {
  const translations: Record<string, string> = {
    'frontDesk.expense.quantity': 'Quantity',
    'frontDesk.expense.date': 'Date',
    'frontDesk.expense.billTo': 'Bill To',
    'frontDesk.expense.status': 'Status',
    'frontDesk.expense.notes': 'Notes',
    'frontDesk.expense.unpaid': 'Unpaid',
    'frontDesk.expense.paid': 'Paid',
    'frontDesk.expense.addExpense': 'Add Expense',
    'frontDesk.room.number': 'Room Number',
    'frontDesk.guest.name': 'Guest Name',
    'form.optional': 'Optional',
    'actions.cancel': 'Cancel',
  };

  return translations[key] || key;
};