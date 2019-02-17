import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Drawer, Hidden, CssBaseline, Toolbar, IconButton } from '@material-ui/core'
import {
    Menu as MenuIcon,
    Build as BuildIcon,
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    Share as ShareIcon,
    Timeline as TimelineIcon,
    ExitToApp as ExitToAppIcon,
    Description as DescriptionIcon,
    Assessment as AssessmentIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    LocationOn as LocationIcon,
    Star as MetricsIcon
} from '@material-ui/icons'

import ScrollToTop from './utils/ScrollToTop'

import SideMenu from './components/Menus/SideMenu'
import UserMenu from './components/Menus/UserMenu'

import HomePage from './views/Index'
import SettingsPage from './views/Settings'
import ProposalsAll from './views/Proposals/All'
import ProposalsByOrganization from './views/Proposals/ByOrganization'
import ProposalsByTic from './views/Proposals/ByTic'
import ProposalsByStatus from './views/Proposals/ByStatus'
import ProposalsByTherapeuticArea from './views/Proposals/ByTherapeuticArea'
import ProposalsByDate from './views/Proposals/ByDate'
import ProposalsResubmitted from './views/Proposals/Resubmitted'
import ProposalsSubmittedForServices from './views/Proposals/SubmittedForServices'
import SiteReportPage from './views/SiteReport'
import StudyMetricsPage from './views/StudyMetrics'
import CollaborationsPage from './views/Collaborations'

const drawerWidth = 240

const styles = (theme) => ({
    layout: {
        display: 'flex',
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.secondary.light,
        backgroundImage: `linear-gradient(
            135deg,
            ${theme.palette.secondary.light} 25%,
            ${theme.palette.extended.shaleBlue} 25%,
            ${theme.palette.extended.shaleBlue} 50%,
            ${theme.palette.secondary.light} 50%,
            ${theme.palette.secondary.light} 75%,
            ${theme.palette.extended.shaleBlue} 75%,
            ${theme.palette.extended.shaleBlue} 100%
        )`,
        backgroundSize: `5.66px 5.66px`,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    brand: {
        border: `1px solid ${ theme.palette.primary.dark }`,
        color: theme.palette.primary.dark,
        fontFamily: 'EB Garamond',
        textAlign: 'center',
        padding: `${2 * theme.spacing.unit }px 0`,
        margin: 4 * theme.spacing.unit,
        borderTopLeftRadius: 2 * theme.spacing.unit,
        borderBottomRightRadius: 2 * theme.spacing.unit,
        transition: 'background-color 250ms',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: 0,
        transition: 'margin-bottom 250ms',
        marginTop: theme.spacing.unit,
        marginBottom: 4 * theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 0,
        },
    },
    flexer: { flex: 1, },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    main: {
        // ...theme.mixins.debug,
        minHeight: '100vh',
        backgroundColor: 'transparent',
        flexGrow: 1,
        padding: 2 * theme.spacing.unit,
        paddingTop: 0,
        transition: 'padding 250ms',
        [theme.breakpoints.up('sm')]: {
            padding: 4 * theme.spacing.unit,
            paddingTop: 0,
        },
    },
})

const Dashboard = props => {
    const { classes } = props
    const [mobileOpen, setMobileOpen] = useState()

    // this object is passed to the SideMenu component to build the dashboard's side menu
    const sideMenuItems = [
        {
            items: [
                { text: 'Dashboard', icon: <DashboardIcon />, href: '/', },
            ],
        },
        {
            items: [
                { text: 'Proposals', icon: <AssessmentIcon/>, href: '/proposals',
                    submenu: [
                        { text: 'All', path: '/proposals', icon: <KeyboardArrowRightIcon />, },
                        { text: 'By Organization', path: '/proposals/organization', icon: <KeyboardArrowRightIcon/> },
                        { text: 'By TIC/RIC', path: '/proposals/tic', icon: <KeyboardArrowRightIcon/> },
                        { text: 'By Status', path: '/proposals/status', icon: <KeyboardArrowRightIcon/> },
                        { text: 'By Domain', path: '/proposals/therapeutic-area', icon: <KeyboardArrowRightIcon/> },
                        { text: 'By Date', path: '/proposals/date', icon: <KeyboardArrowRightIcon/> },
                        { text: 'Submitted For Services', path: '/proposals/submitted-for-services', icon: <KeyboardArrowRightIcon/> },
                        { text: 'Resubmissions', path: '/proposals/resubmissions', icon: <KeyboardArrowRightIcon/> },
                    ]
                },
                { text: 'Forecasts', icon: <TimelineIcon/>, href: '/forecasts', disabled: true, },
                { text: 'Site Report', icon: <LocationIcon/>, href: '/site-report', },
                { text: 'Study Metrics', icon: <MetricsIcon/>, href: '/study-metrics', },
            ],
        },
        {
            items: [
                { text: 'Collaborations', icon: <ShareIcon />, href: '/analytics/collaborations', },
                { text: 'QueryBuilder', icon: <BuildIcon />, href: '/analytics/query-builder', disabled: true, },
            ],
        },
    ]

    const userMenuItems = [
        { text: 'Settings', href: '/settings', icon: <SettingsIcon /> },
        { text: 'Logout', href: '/', icon: <ExitToAppIcon />, },
    ]
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

        
    const brand = (
        <div className={ classes.brand }>
            <div style={{ fontSize: '360%', lineHeight: '4rem', }}>Duke</div>
            <div style={{ fontSize: '180%', lineHeight: '2rem', }}>Vanderbilt</div>
            <div style={{ fontSize: '400%', lineHeight: '4rem', }}>TIC</div>
        </div>
    )

    return (
        <div className={ classes.layout }>
            <nav className={ classes.drawer }>
                <Hidden smUp implementation="css">
                    <Drawer anchor={ 'left' } variant="temporary"
                        open={ mobileOpen } onClose={ handleDrawerToggle }
                        classes={{ paper: classes.drawerPaper, }} container={ props.container }
                        ModalProps={{ keepMounted: true, }} // Better open performance on mobile.
                    >
                        <a href="/">{ brand }</a>
                        <SideMenu menuItems={ sideMenuItems }/>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer open variant="permanent" classes={{ paper: classes.drawerPaper }}>
                        <a href="/">{ brand }</a>
                        <SideMenu menuItems={ sideMenuItems }/>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={ classes.main }>
                <CssBaseline />
                <ScrollToTop>
                    <Toolbar className={ classes.toolbar }>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={ handleDrawerToggle }
                            className={ classes.menuButton }
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={ classes.flexer }/>
                        <UserMenu menuItems={ userMenuItems }/>
                    </Toolbar>
                    <Switch>
                        <Route exact path="/settings" component={ SettingsPage }/>
                        <Route exact path="/proposals" component={ ProposalsAll }/>
                        <Route path="/proposals/organization" component={ ProposalsByOrganization }/>
                        <Route path="/proposals/tic" component={ ProposalsByTic }/>
                        <Route path="/proposals/status" component={ ProposalsByStatus }/>
                        <Route path="/proposals/therapeutic-area" component={ ProposalsByTherapeuticArea }/>
                        <Route path="/proposals/date" component={ ProposalsByDate }/>
                        <Route path="/proposals/submitted-for-services" component={ ProposalsSubmittedForServices }/>
                        <Route path="/proposals/resubmissions" component={ ProposalsResubmitted }/>
                        <Route path="/site-report" component={ SiteReportPage }/>
                        <Route path="/study-metrics" component={ StudyMetricsPage }/>
                        <Route path="/analytics/collaborations" component={ CollaborationsPage }/>
                        <Route path="/" component={ HomePage }/>
                    </Switch>
                </ScrollToTop>
            </main>
        </div>
    )
}

export default withStyles(styles)(Dashboard)