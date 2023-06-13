import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <PersistGate persistor = {persistor} loading = {null}>
          <App />
      </PersistGate>
   
    </Provider>

)
