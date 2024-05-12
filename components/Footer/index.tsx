export default function Footer() {
    return(
    <footer className="bg-accent-1 border-t border-accent-2 lg:w-2/3">      
        <div className="py-20 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/3">
            El Balcon
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/3">
            <p>Chacabuco 129</p>
          </div>
          <div className="lg:w-1/3 text-center">
            <p>Tres Arroyos</p>            
          </div>            
        </div>      
    </footer>
    )    
};
