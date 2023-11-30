import Navbar from './Navbar';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className='container pt-5'>
                <p className='text-center'><h1 className='text-success'>Stockify</h1> 
                is a stock tracking application meant to be completely customizable by you, the user.
                </p>
            </div>
        </div>
    );
};

export default About;