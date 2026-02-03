
import React, { createContext, useContext, useState, useEffect } from 'react';

const LibraryContext = createContext(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  return context;
};

export const LibraryProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Initial Mock Data
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '123456', category: 'Classic', available: true },
    { id: 2, title: '1984', author: 'George Orwell', isbn: '789012', category: 'Dystopian', available: true },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '345678', category: 'Fantasy', available: false },
  ]);

  const [members, setMembers] = useState([
    { id: 1, name: 'Ritik', email: 'ritik@gmail.com', phone: '123-456-7890', joinDate: '2023-01-15' },
    { id: 2, name: 'Harjas', email: 'harjas@gmail.com', phone: '098-765-4321', joinDate: '2023-02-20' },
  ]);

  const [borrowings, setBorrowings] = useState([
    { id: 1, bookId: 3, memberId: 1, borrowDate: '2024-05-01', dueDate: '2024-05-15', returned: false },
  ]);

  const addBook = (book) => setBooks([...books, { ...book, id: Date.now(), available: true }]);
  const updateBook = (id, data) => setBooks(books.map(b => b.id === id ? { ...b, ...data } : b));
  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));

  const addMember = (member) => setMembers([...members, { ...member, id: Date.now(), joinDate: new Date().toISOString().split('T')[0] }]);
  const updateMember = (id, data) => setMembers(members.map(m => m.id === id ? { ...m, ...data } : m));
  const deleteMember = (id) => setMembers(members.filter(m => m.id !== id));

  const borrowBook = (bookId, memberId) => {
    const newBorrowing = {
      id: Date.now(),
      bookId,
      memberId,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returned: false
    };
    setBorrowings([...borrowings, newBorrowing]);
    setBooks(books.map(b => b.id === bookId ? { ...b, available: false } : b));
  };

  const returnBook = (borrowId) => {
    const borrowing = borrowings.find(b => b.id === borrowId);
    if (borrowing) {
      setBorrowings(borrowings.map(b => b.id === borrowId ? { ...b, returned: true } : b));
      setBooks(books.map(b => b.id === borrowing.bookId ? { ...b, available: true } : b));
    }
  };

  return (
    <LibraryContext.Provider value={{
      currentPage, setCurrentPage,
      books, addBook, updateBook, deleteBook,
      members, addMember, updateMember, deleteMember,
      borrowings, borrowBook, returnBook
    }}>
      {children}
    </LibraryContext.Provider>
  );
};
