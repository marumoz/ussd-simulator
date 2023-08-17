// we want to get the sidebar configs from data then a user just passes the params in the function
// we return a filtered and formatted config
// import Links from '@config/data/links'

import Links  from '@config/data/links';

let sharedLinks        = Links['sidenav']
let corporateLinks     = Links['corporateLinks']
let dashboard           = {
    Dashboard: {
        icon: 'dashboard',
        text: 'Dashboard',
        path: '/dashboard',
        children: [
            {
                text: 'Transactions',
                path: '/dashboard/txn-analytics'
            },
            {
                text: 'Usage',
                path: '/dashboard/usage-analytics'
            },
            {
                text: 'Trends',
                path: '/dashboard/trends-analytics'
            }
        ]
      }
}

export const GenerateLinks = ( type = 'default', root = 'transactions', include = ['*'] ) => {

    let generated = { ...dashboard }

    switch ( type.toLowerCase() ) {
        case 'default':
            generated = { ...generated, ...sharedLinks }
            break;

        case 'corporate':
            generated = { ...generated, ...corporateLinks, ...sharedLinks }
            break;
    }

    return generated

}
