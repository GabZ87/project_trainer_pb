interface MenuItem {
    url: string;
    title: string;
}

interface AccountMenuItem extends MenuItem {
    page: string;
}

const leftMenuItems: Record<string, MenuItem> = {
    About: {
        url: 'about.htm',
        title: 'About Us'
    },
    Services: {
        url: 'services.htm',
        title: 'Services'
    },
    Products: {
        url: 'products.jsp',
        title: 'Products'
    },
    Locations: {
        url: 'contacts.jsp',
        title: 'Locations'
    },
    Admin: {
        url: 'admin.htm',
        title: 'Admin'
    }
}


const footerMenuItems: Record<string, MenuItem> = {
    Home: {
        url: 'index.htm',
        title: 'Home'
    },
    About: {
        url: 'about.htm',
        title: 'About Us'
    },
    Services: {
        url: 'services.htm',
        title: 'Services'
    },
    Products: {
        url: 'products.jsp',
        title: 'Products'
    },
    Locations: {
        url: 'contacts.jsp',
        title: 'Locations'
    },
    Forum: {
        url: 'forums.parasoft.com',
        title: 'Forum'
    },
    SiteMap: {
        url: 'sitemap.htm',
        title: 'Site Map'
    },
    Contact: {
        url: 'contact.htm',
        title: 'Contact Us'
    }
}

const homeMenuItems: Record<string, MenuItem> = {

Home: {
    url: 'index.htm',
    title: 'home'
},

AboutUs: {
    url: 'about.htm',
    title: 'about'
},

Contact: {
    url: 'contact.htm',
    title: 'contact'
}

}

const accountMenuItems: Record<string, AccountMenuItem> = {
    NewAccount: {
        url: 'openaccount.htm',
        title: 'Open New Account',
        page: 'Open New Account'
    },
    AccountsOverview: {
        url: 'overview.htm',
        title: 'Accounts Overview',
        page: 'Accounts Overview'
    },
    TransferFunds: {
        url: 'transfer.htm',
        title: 'Transfer Funds',
        page: 'Transfer Funds'
    },
    BillPay: {
        url: 'billpay.htm',
        title: 'Bill Pay',
        page: 'Bill Payment Service'
    },
    FindTransactions: {
        url: 'findtrans.htm',
        title: 'Find Transactions',
        page: 'Find Transactions'
    },
    UpdateContactInfo: {
        url: 'updateprofile.htm',
        title: 'Update Contact Info',
        page: 'Update Profile'
    },
    RequestLoan: {
        url: 'requestloan.htm',
        title: 'Request Loan',
        page: 'Apply for a Loan'
    },
    LogOut: {
        url: 'logout.htm',
        title: 'Log Out',
        page: '?' //back to home page
    }
}

    interface UserField {
    input: string;
    type: string;
}

const userData: Record<string, UserField> = {

firstName: {
    input: 'customer.firstName',
    type: 'firstName'
},

lastName: {
    input: 'customer.lastName',
    type: 'lastName'
},

address: {
    input: 'customer.address.street',
    type: 'address'
},

city: {
    input: 'customer.address.city',
    type: 'city'
},

state: {
    input: 'customer.address.state',
    type: 'state'
},

zipCode: {
    input: 'customer.address.zipCode',
    type: 'zipCode'
},

phoneNumber: {
    input: 'customer.phoneNumber',
    type: 'phoneNumber'
},

ssn: {
    input: 'customer.ssn',
    type: 'ssn'
},

username: {
    input: 'customer.username',
    type: 'username'
},

password: {
    input: 'customer.password',
    type: 'password'
},

repeatPassword: {
    input: 'repeatedPassword',
    type: 'password'
}

}

//make 2 users

export { leftMenuItems, footerMenuItems, homeMenuItems, accountMenuItems, userData };
