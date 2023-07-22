import { useEffect, useState } from 'react';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import Earth from '../icons/earth.png';
import Liberty from '../icons/liberty.png';
import Panda from '../icons/panda.png';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import Cheese from '../icons/smallCheese.png';
import Eiffel from '../icons/eiffel-tower.png';
import Maple from '../icons/maple-leaf.png';
import Kpop from '../icons/kpop.png';
import axios from 'axios';
import { FetchAPIPost } from '../utils/api.js';

function Clock({move, userId}){
    const [settings, setSettings] = useState(false);
    const [date, setDate] = useState(new Date());
    const [nyDate, setNyDate] = useState(new Date());
    const [korDate, setKorDate] = useState(new Date());
    const [beiDate, setBeiDate] = useState(new Date());
    const [parDate, setParDate] = useState(new Date());
    const [vanDate, setVanDate] = useState(new Date());
    const [show, setShow] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [my, setMy] = useState(true);
    const [ny, setNy] = useState(false);
    const [kor, setKor] = useState(false);
    const [van, setVan] = useState(false);
    const [bei, setBei] = useState(false);
    const [par, setPar] = useState(false);

    const weekday = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : "https://cheese-me.fly.dev/",
    });

    useEffect(() => {
        if (userId) {
            instance.get('/api/clock/getByOwner/' + userId, {
                withCredentials: true
            })
                .then((res) => {
                    const n = res?.data;
                    if (n) {
                        if (n.show.length === 0 || n.show === undefined) {
                            setShow([true, false, false, false, false, false]);
                        }
                        else {
                            setShow(n.show);
                        }
                    } else {
                        setAddNew(true);
                    }
                    return;
                })
                .catch((err) => {
                    console.log('Error loading clock: ', err)
                })
        }
    }, [userId]);

    useEffect(() => {
        if (show.length > 0 && userId){
            setMy(show[0]);
            setNy(show[1]);
            setKor(show[2]);
            setVan(show[3]);
            setBei(show[4]);
            setPar(show[5]);

            if (addNew) {
                add();
                setAddNew(false);
            } else {
                change();
            }
        }
    }, [show, addNew]);

    useEffect(() => {
        if (userId && addNew) {
            add();
            setAddNew(false);
        }
    }, [addNew]);
  
    useEffect(() => {
        const intervalId = setInterval(() => {
            let d = new Date();
            setDate(d);
            setNyDate(new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000*-4)))
            setKorDate(new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000*+9)))
            setBeiDate(new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000*+8)))
            setVanDate(new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000*-8)))
            setParDate(new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000*+1)))
        }, 10000)
    return () => clearInterval(intervalId);
    }, []);

    const change = async () => {
        let res = await FetchAPIPost('/api/clock/update/' + userId, {
            show: show
        });
    };

    const add = async () => {
        let res = await FetchAPIPost('/api/clock/add/' + userId, {
            show: [true, false, false, false, false, false]
        });
        setShow([true, false, false, false, false, false]);
        setAddNew(false);
    };

    const handleCountryClick = (index) => {
        const tmp = show.map((bool, i) => {
            if (i === index) {
                return !bool;
            } else {
                return bool;
            }
        });
        setShow(tmp);
    }

    return (
        <div className="clockWidget">
            {move && <strong><OpenWithSharpIcon sx={{fontSize: '7rem'}}/></strong>}
            {(my || ny || kor || bei || par || van) && <div className='clockWidgetTitle'>
                <span style={{marginLeft: '0.5rem'}}>World Clock<img src={Earth} alt='earth' style={{width: '1.3rem', marginLeft: '1rem'}}/></span>
                <div className='settingMode'>
                    {settings ? <ExpandLessRoundedIcon sx={{fontSize: '3rem', marginTop:'1rem', color: '#78d2fa'}} onClick={() => setSettings(false)}/> 
                    : <ExpandMoreRoundedIcon sx={{fontSize: '3rem', marginTop:'1rem', color: '#78d2fa'}} onClick={() => setSettings(true)}/>}
                </div>
            </div>}
            <div className='clockTop'>
                {(!my && !ny && !kor && !bei && !par && !van) && <div className='clockWidgetTitle'>
                    <span style={{marginLeft: '0.5rem'}}>World Clock<img src={Earth} alt='earth' style={{width: '1.3rem', marginLeft: '1rem'}}/></span>
                    <div className='settingMode'>
                        {settings ? <ExpandLessRoundedIcon sx={{fontSize: '3rem', marginTop:'1rem', color: '#78d2fa'}} onClick={() => setSettings(false)}/> 
                        : <ExpandMoreRoundedIcon sx={{fontSize: '3rem', marginTop:'1rem', color: '#78d2fa'}} onClick={() => setSettings(true)}/>}
                    </div>
                </div>}
                <div className='clocks'>
                    {my && <div className='timeZone'>
                        <div className='time'>
                            <img src={Cheese} alt='cheese'/>
                            <span>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{date.getMonth()+1}/{date.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[date.getDay()]}</span>
                        </div>
                    </div>}
                    {ny && <div className='timeZone'>
                        <div className='time'>
                            <img src={Liberty} alt='liberty'/>
                            <span>{nyDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{nyDate.getMonth()+1}/{nyDate.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[nyDate.getDay()]}</span>
                        </div>
                    </div>}
                    {kor && <div className='timeZone'>
                        <div className='time'>
                            <img src={Kpop} alt='kpop'/>
                            <span>{korDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{korDate.getMonth()+1}/{korDate.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[korDate.getDay()]}</span>
                        </div>
                    </div>}
                    {van && <div className='timeZone'>
                        <div className='time'>
                            <img src={Maple} alt='maple'/>
                            <span>{vanDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{vanDate.getMonth()+1}/{vanDate.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[vanDate.getDay()]}</span>
                        </div>
                    </div>}
                    {bei && <div className='timeZone'>
                        <div className='time'>
                            <img src={Panda} alt='earth'/>
                            <span>{beiDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{beiDate.getMonth()+1}/{beiDate.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[beiDate.getDay()]}</span>
                        </div>
                    </div>}
                    {par && <div className='timeZone'>
                        <div className='time'>
                            <img src={Eiffel} alt='eiffel'/>
                            <span>{parDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className='timeDate'>
                            <span>{parDate.getMonth()+1}/{parDate.getDate()}</span>
                            <span style={{marginLeft: '5px'}}>{weekday[parDate.getDay()]}</span>
                        </div>
                    </div>}
                </div>
            </div>
            {settings && <div className='countries' style={{marginTop: '0.8rem'}}>
                <div className={my ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(0) : () => setMy(!my)}>
                        <img src={Cheese} alt='cheese'/>
                        <span>MY TIME</span>
                    </button>
                </div>
                <div className={ny ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(1) : () => setNy(!ny)}>
                        <img src={Liberty} alt='ny'/>
                        <span>NEW YORK</span>
                    </button>
                </div>
                <div className={kor ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(2) : () => setKor(!kor)}>
                        <img src={Kpop} alt='kor'/>
                        <span>SEOUL</span>
                    </button>
                </div>
            </div>}
            {settings && <div className='countries'>
                <div className={van ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(3) : () => setVan(!van)}>
                        <img src={Maple} alt='van'/>
                        <span>VANCOUVER</span>
                    </button>
                </div>
                <div className={bei ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(4) : () => setBei(!bei)}>
                        <img src={Panda} alt='bei'/>
                        <span>BEIJING</span>
                    </button>
                </div>
                <div className={par ? 'country' : 'countryOff'}>
                    <button onClick={userId ? () => handleCountryClick(5) : () => setPar(!par)}>
                        <img src={Eiffel} alt='paris'/>
                        <span>PARIS</span>
                    </button>
                </div>
            </div>}
        </div>
    )

}

export default Clock;