package expense_tracker.controller;

import expense_tracker.model.Expense;
import expense_tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    // GET ALL
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // ADD
    @PostMapping
    public String addExpense(@RequestBody Expense expense) {
        expenseRepository.save(expense);
        return "Expense added successfully";
    }

    // UPDATE
    @PutMapping("/{id}")
    public String updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id).orElse(null);

        if (expense != null) {
            expense.setTitle(updatedExpense.getTitle());
            expense.setAmount(updatedExpense.getAmount());
            expense.setCategory(updatedExpense.getCategory());
            expense.setDate(updatedExpense.getDate());

            expenseRepository.save(expense);
            return "Expense updated successfully";
        }

        return "Expense not found";
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return "Expense deleted successfully";
    }
}