import { Button, Stack } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/addBudgetModal";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/addExpenseModal";


function App() {
  const [showAddBudgetModal, setShowaddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowaddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [showAddExpenseModalbudgetId, setAddExpenseBudgetIdModal] = useState()
  const { budgets , getBudgetExpenses} = useBudgets()


  function openAddExpenseModal(budgetId){
    setShowaddExpenseModal(true)
    setAddExpenseBudgetIdModal(budgetId)
  }
  return (
    <><Container className="my-4">
      <Stack direction = "horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowaddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{ display:"grid", gridTemplatecolumns: "repeat(auto-fill,minmax(300px, 1fr))", gap: "1rem", alignItems:"Flex-start"}}>
        { budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount, 0
          )
          return ( 
           <BudgetCard 
           key = {budget.id}
           name = {budget.name}
           amount={amount}
           max = {budget.max}
           onAddExpenseClick = {() => openAddExpenseModal(budget.id)}
           onViewExpensesClick = {()=> setViewExpensesModalBudgetId(budget.id)}
           />
           )
           })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick ={()=> setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard /> 
      </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} 
                    handleClose = {() => 
                    setShowaddBudgetModal(false)}/>
    <AddExpenseModal show={showAddExpenseModal}
                     defaultBudgetId = {showAddExpenseModalbudgetId} handleClose = {() =>
                     setShowaddExpenseModal(false)}
    />
     <ViewExpensesModal budgetId = {viewExpensesModalBudgetId} 
                       handleClose = {() => setViewExpensesModalBudgetId()}
    />
    </>
  );
}

export default App;
