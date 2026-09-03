
import './App.css'

import { AuthProvider,} from './context/AuthContext'
import Layout from './Layout'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { CustAuthProvider } from './context/CustomerAuthContext'

function App() {

  return (
    <>
    <CustAuthProvider>
      <AuthProvider>
      <CartProvider>
        <OrderProvider>
           <Layout/>
        </OrderProvider>
     </CartProvider>
    </AuthProvider>
    </CustAuthProvider>
    
  
    </>
  )
}

export default App
