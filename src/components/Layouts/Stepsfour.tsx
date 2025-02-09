const Stepsfour = () => {
    return ( 

        <div className="multi-step pb-6 lg:pb-14">
                    <ol className="grid grid-cols-4 lg:pr-5">
                        <li className="bg-gray-500 text-white px-2 lg:px-6 xl:px-10 text-right font-bold py-2 xl:py-4 text-sm lg:text-24 xl:text-34 border-r-2 border-white rounded-r-full relative z-50 active-linear-gradient-green textnav">
                            <a href="#" className="uppercase">
                                BOOK
                            </a>
                        </li>
                        <li className="bg-secondary text-white px-2 lg:px-6 xl:px-10 text-right font-bold py-2 xl:py-4 text-sm lg:text-24 xl:text-34 border-r-2 border-white rounded-r-full relative z-40 -ml-10 active-linear-gradient-green textnav">
                            <a href="#" className="uppercase">
                                CONFIRM
                            </a>
                        </li>
                        <li className="bg-gray-500 text-white px-2 lg:px-6 xl:px-10 text-right font-bold py-2 xl:py-4 text-sm lg:text-24 xl:text-34 border-r-2 border-white rounded-r-full relative z-30 -ml-10 active-linear-gradient-green textnav">
                            <a href="#" className="uppercase">
                                EARN CASH
                            </a>
                        </li>
                        <li className="bg-gray-500 text-white px-2 lg:px-6 xl:px-10 text-right font-bold py-2 xl:py-4 text-sm lg:text-24 xl:text-34 border-r-2 border-white rounded-r-full relative z-20 -ml-10 active-linear-gradient-green textnav">
                            <a href="#" className="uppercase">
                                COMPLETE
                            </a>
                        </li>
                    </ol>
                </div>
     );
}
 
export default Stepsfour;