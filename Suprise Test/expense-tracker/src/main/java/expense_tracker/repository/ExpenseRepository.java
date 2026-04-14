package expense_tracker.repository;

import expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // ❌ REMOVE THIS (IMPORTANT)
    // List<Expense> findByUser(User user);

}