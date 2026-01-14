import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    return(
        <div className='position-absolute top-50 start-50 translate-middle'>
        <div className="container nt-4">
            <h2 className="text-center">Learning Bootstrap</h2>
            <div className='card p-3 mp-3'>
                <input type="text" className="form-control" placeholder='enter your name' />
                <br />
                <input type="text" className="form-control" placeholder='enter your age' />
                <br />
                <button className='btn btn-primary'>submit</button>
            </div>
        </div>
        </div>
    )
};

export default App;