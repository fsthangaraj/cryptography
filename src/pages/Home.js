import { React,useState} from "react";
import CryptoJS from 'crypto-js';
import copy from "copy-to-clipboard"; 

const aes_key = '9cb26f4e-1394-419e-814c-492896f16719';
export default function Home() {
    const [cryptTerm, setCryptTerm] = useState('')
    const [output, setOutput] =useState(null)
    const [copyText, setCopyText] = useState('');

    const copyToClipboard = () => {
        copy(copyText);
        alert(`You have copied "${copyText}"`);
    }
    const onChangeHandler =(event)=>{
        setCryptTerm(event.target.value)
    }
    const encrypt =()=>{
        setOutput(null)
        setCopyText('')
        if(cryptTerm.length >0){
            const cipher = CryptoJS.AES.encrypt(cryptTerm, aes_key).toString();
            setOutput(cipher)
            setCopyText(cipher);
        }
        
    }
    const decrypt =()=>{
        setOutput(null)
        setCopyText('')
        if(cryptTerm.length >0){
            let bytes = CryptoJS.AES.decrypt(cryptTerm, aes_key);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            setOutput(originalText)
            setCopyText(originalText);
        }
    }
  return (
    <div className=''>
        <div className='w-full bg-slate-50 h-14 py-[14px] px-3 font-bold text-xl '>
            Encryption And Decryption
        </div>
        <div>
            <div className='my-20 mx-32 w-[100%]'>
                <div className='font-semibold text-lg'>
                    Enter the String
                </div>
                <div className='mt-3 '>
                    <input className='border w-[80%] h-10 rounded px-2' placeholder ='Enter the String' onChange={(e)=>onChangeHandler(e)} />
                </div>
                <div className="mt-7 mx-3 space-x-14">
                    <button className="border px-3 py-2 rounded text-white bg-[#198753] hover:bg-green-700" disabled={cryptTerm !=null || cryptTerm.length> 0?false:true} onClick={()=>encrypt()}>Encrypt</button>
                    <button className="border px-3 py-2 rounded text-black bg-[#ffc007] hover:bg-yellow-400" onClick={()=>decrypt()}>Decrypt</button>
                </div>
                <div className="mt-10 font-semibold text-lg ">
                    Value 
                </div>
                <div className="mt-3">
                    <input className="border rounded bg-slate-50 w-[80%] h-10 px-2" placeholder="Output value" value={`${output !=null?output:''}`} />
                </div>
                <div className="mt-7 mx-3">
                <button className="border px-5 py-[6px] rounded text-white bg-[#4993e1]  hover:bg-[#4994d0]" onClick={()=>copyToClipboard()} >Copy</button>
                </div>
            </div>
        </div>
    </div>
  )
}
