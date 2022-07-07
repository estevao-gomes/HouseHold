interface BillsPaymentProps{
    style?:string
}

export function BillsPayment({ style }: BillsPaymentProps){
    return(
        <div className={`${style? style : ""}`}>
            Bills Payment
        </div>
    )
}