let getAllAccounts = [ 
    "accountID", 
    "currency", 
    "NickName",
    "SchemeName",
    "Identification",
    "Name",
    "SecondaryIdentification"
];

let getBalance = [
    "accountID",
    "BalanceAmount",
    "currency",
    "CreditDebitIndicator",
    "Type",
    "lastUpdatedDateTime"

];

let getBeneficiaries = [
    "AccountId",
    "beneficiaryId",
    "Reference",
    "CASchemeName",
    "CAIdentification",
    "CABeneficiaryName"
];

let getDirectDebits = [
    "AccountId",
    "DirectDebitId",
    "MandateIdentification",
    "DirectDebitStatusCode",
    "Name",
    "PreviousPaymentDateTime",
    "Amount",
    "Currency"
];

let getStandingOrders = [
    "AccountId",
    "StandingordersId",
    "Frequency",
    "Reference",
    "FirstPaymentDateTime",
    "FirstPaymentAmount",
    "FirstPaymentAmountCurrency",
    "NextPaymentDateTime",
    "NextPaymentAmount",
    "NextPaymentAmountCurrency",
    "FinalPaymentDateTime",
    "FinalPaymentAmount",
    "FinalPaymentAmountCurrency",
    "SchemeName",
    "Identification",
    "Name"

];

let getProducts = [
    "AccountId",
    "SecondaryProductIdentifier",
    "ProductType",
    "ProductName"
];

let getTransactions = [
    "AccountId",
    "TransactionId",
    "TransactionReference",
    "Amount",
    "Currency",
    "CreditDebitIndicator",
    "Status",
    "BookingDateTime",
    "ValueDateTime",
    "TransactionInformation",
    "BankTransactionCode",
    "BankTransactionSubCode",
    "ProprietaryBankTransactionCode",
    "ProprietaryBankTransactionIssuer",
    "Amount",
    "Type"
];

let getCreditLine = [
    "Creditlineid",
    "Included",
    "Amount",
    "Currency",
    "Type",
    "AccountId"
];


module.exports = {
    getAllAccounts,
    getBeneficiaries,
    getDirectDebits,
    getStandingOrders,
    getProducts,
    getTransactions,
    getBalance,
    getCreditLine
};
