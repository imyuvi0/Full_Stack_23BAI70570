package expense_tracker.controller;

import expense_tracker.model.Expense;
import expense_tracker.model.User;
import expense_tracker.repository.ExpenseRepository;
import expense_tracker.repository.UserRepository;
import expense_tracker.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // GET
    @GetMapping
    public List<Expense> getExpenses(@RequestHeader("Authorization") String token) {

        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email).orElse(null);

        return expenseRepository.findByUser(user);
    }

    // ADD
    @PostMapping
    public String addExpense(@RequestHeader("Authorization") String token,
                            @RequestBody Expense expense) {

        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email).orElse(null);

        expense.setUser(user);
        expenseRepository.save(expense);

        return "Added";
    }

    // DELETE ✅ FIXED
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id,
                               @RequestHeader("Authorization") String token) {

        Expense expense = expenseRepository.findById(id).orElse(null);

        if (expense == null) return "Not found";

        expenseRepository.delete(expense);
        return "Deleted";
    }

    // UPDATE ✅ FIXED
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                @RequestBody Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id).orElse(null);

        if (expense == null) return null;

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());

        return expenseRepository.save(expense);
    }
}