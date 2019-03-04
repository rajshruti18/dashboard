import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from './Theme'
import Dashboard from './Dashboard'
import { ThemeProvider } from '@material-ui/styles'
import { ApiContext, endpoints } from './contexts/ApiContext'
import { SettingsProvider } from './contexts/SettingsContext'

const App = props => {
    return (
        <Router>
            <ApiContext.Provider value={ endpoints }>
                <ThemeProvider theme={ Theme }>
                    <SettingsProvider>
                        <Dashboard />
                    </SettingsProvider>
                </ThemeProvider>
            </ApiContext.Provider>
        </Router>
    )
}

export default App