import React, { useState } from 'react'
import tw                               from 'twin.macro'
import styled                           from 'styled-components'
import moment                           from 'moment'
import { IoMdBatteryFull, IoIosContact } from 'react-icons/io'
import { GiNetworkBars }                from 'react-icons/gi'
import { TiHome }                       from 'react-icons/ti'
import { ImAttachment }                 from 'react-icons/im'
import { MdPrivacyTip, MdLocalPhone }   from 'react-icons/md'
import { RiDeleteBack2Fill }            from 'react-icons/ri'
import { toast }                        from 'react-toastify'

import MainLayout   from '@components/layout/body'
import InputPhone   from '@components/ui/input-phone'
import InputText    from '@components/ui/input'
import Button       from '@components/ui/Button'
import Modal        from '@components/ui/UssdMenu'

const Simulator = () => {
    const [ phoneNumber, setPhoneNumber ]   = useState('254715748115')
    const [ callbackurl, setCallbackurl ]   = useState('')
    const [ imsi, setImsi ]                 = useState('1584078810545460')
    const [ hasError, setHasError ]         = useState(false)
    const [ message, setMessage ]           = useState('')
    const [ view, setView ]                 = useState('home')
    const [ dialInput, setDialInput ]       = useState('')
    const [ showModal, setShowModal ]       = useState(false)
    const [ loadingState, setLoadingState ] = useState(false)
    const [ ussdBody, setUssdBody ]         = useState('')
    const [ sessionId, setSessionId ]       = useState(Math.floor(1000000 + Math.random() * 9000000))
    const [ responseBody, setResponseBody ] = useState('')
    const [ ussdEndpoint, setUssdEndpoint ] = useState('')

    let updatePhoneNumber = () => {
        if(phoneNumber && phoneNumber.length > 5 && phoneNumber.length <= 15){
            !callbackurl && setView('enter-callbackurl')
            callbackurl && setView('home')
            setHasError(false)
            setMessage('')
        }else{
            setHasError(true)
            setMessage('Invalid phone number')
        }
    }
    let updateCallback = () => {
        if(callbackurl && callbackurl.startsWith('http://') || callbackurl && callbackurl.startsWith('https://')){
            setView('home')
            setHasError(false)
            setMessage('')
        }else{
            setHasError(true)
            setMessage('Invalid callback url (must start with http)')
        }
    }
    let updatePhoneImsi = () => {
        setView('home')
        setHasError(false)
        setMessage('')
    }
    let updateDialInput = (textInput) => {
        let input = dialInput
        input += textInput
        setDialInput(input)
    }
    let deleteLastInput = () => {
        let input = dialInput
        input = input.slice(0, -1)
        
        setDialInput(input)
    }
    let sendToCallback = async () => {
        if(dialInput && dialInput.startsWith('*') && dialInput.endsWith('#')){
            let url = `${callbackurl}?MOBILE_NUMBER=${phoneNumber}&SESSION_ID=${sessionId}&SERVICE_CODE=${dialInput.replace(/#/, '')}&IMSI=${imsi}&USSD_BODY=`
            setLoadingState(true)
            setShowModal(true)

            //send request
            let response = `END The ussd enpoint: ${callbackurl} is unreachable`
            
            try {
                response = await fetch (
                    url
                ).then(res => res.text())
            } catch (error) {
                console.log(error)
            }

            setSessionId(Math.floor(1000000 + Math.random() * 9000000))

            setResponseBody(response)
            setUssdEndpoint(url)
            //alert character exceeds limit of 246 characters
            if(response.length > 160){
                toast.error(`The current Menu exceeds the maximum characters of 160`)
            }

            setLoadingState(false)
        }
    }
    const submit = async () => {
        if(ussdBody){
            setLoadingState(true)
            //send request
            let response = `END The ussd enpoint: ${callbackurl} is unreachable`

            try {
                response = await fetch (
                    `${ussdEndpoint}${ussdBody}`
                ).then(res => res.text())
            } catch (error) {
                console.log(error)
            }
            
            //append ussdBody to ussdString with *
            setUssdEndpoint(`${ussdEndpoint}${ussdBody}*`)
            //reset ussdBody to empty
            setResponseBody(response)
            setUssdBody('')
            setLoadingState(false)

            //alert character exceeds limit of 246 characters
            if(response.length > 160){
                toast.error(`The current Menu exceeds the maximum characters of 160. The current character length is ${response.length}`)
            }
        }
    }
  return (
    <MainLayout>
        <div className='w-full h-full flex items-center justify-center'>
            <Container className='relative'>
                <div className='absolute -top-10 left-1/2 w-14 h-1 block bg-gray-200 rounded-md transform -translate-x-1/2'/>
                <div className='absolute -bottom-12 left-1/2 w-10 h-10 block bg-gray-200 rounded-full transform -translate-x-1/2'/>
                <MainDiv className='w-full h-full overflow-hidden'>
                    <div className='h-7 w-full px-1 bg-secondary-300 flex items-center justify-between'>
                        <span className='tracking-wide font-medium text-sm text-gray-700'>{moment().format('dddd DD, MMM')}</span>
                        
                        <div className='flex text-lg text-gray-100'>
                            <GiNetworkBars/>
                            <IoMdBatteryFull/>
                        </div>
                    </div>

                    {
                        view === 'enter-phonenumber' && (
                            <div className='px-3 py-2'>
                                <div className='mt-3 px-2'>
                                    <InputPhone
                                        inputId = 'phonenumber'
                                        formId = 'enter-phonenumber'
                                        helperText = ''
                                        updateState = {(inputId, formId, { hasError, message })=> { setHasError(hasError); setMessage(message)}}
                                        formStatus = {{}}
                                        txnData = {{}}
                                        value = {phoneNumber}
                                        updateText = {(inputId, formId, { textInput }) => setPhoneNumber(textInput)}
                                        variant = 'toplabel'
                                        label = 'Enter phone number'
                                        hasError = {hasError}
                                        message = {message}
                                    />

                                    <div className='mt-5 flex justify-center'>
                                        <Button sm secondary callback = {updatePhoneNumber} >Connect</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        view === 'enter-callbackurl' && (
                            <>
                                <div className='mt-3 px-2'>
                                    <InputText
                                        inputId = 'callbackUrl'
                                        formId = 'enter-callbackurl'
                                        helperText = ''
                                        updateState = {(inputId, formId, { hasError, message })=> { setHasError(hasError); setMessage(message)}}
                                        formStatus = {{}}
                                        txnData = {{}}
                                        value = {callbackurl}
                                        updateText = {(inputId, formId, { textInput }) => setCallbackurl(textInput)}
                                        variant = 'toplabel'
                                        label = 'Callback URL'
                                        hasError = {hasError}
                                        message = {message}
                                    />

                                    <div className='mt-5 flex justify-center'>
                                        <Button sm secondary callback = {updateCallback} >Connect</Button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        view === 'enter-imsi' && (
                            <>
                                <div className='mt-3 px-2'>
                                    <InputText
                                        inputId = 'imsi'
                                        formId = 'enter-imsi'
                                        helperText = ''
                                        updateState = {(inputId, formId, { hasError, message })=> { setHasError(hasError); setMessage(message)}}
                                        formStatus = {{}}
                                        txnData = {{}}
                                        value = {imsi}
                                        updateText = {(inputId, formId, { textInput }) => setImsi(textInput)}
                                        variant = 'toplabel'
                                        label = 'IMSI'
                                        hasError = {hasError}
                                        message = {message}
                                    />

                                    <div className='mt-5 flex justify-center'>
                                        <Button sm secondary callback = {updatePhoneImsi} >Connect</Button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        view === 'home' && (
                            <>
                                <div className='px-3 pt-9 w-full flex items-center justify-between flex-wrap'>
                                    <UssdDiv allowdial={ phoneNumber && callbackurl}  onClick={()=> phoneNumber && callbackurl && setView('dial')}>
                                        <MdLocalPhone className='text-2xl h-full'/>
                                        <span className='text-sm tracking-wider font-semibold text-primary-100'>USSD</span>
                                    </UssdDiv>
                                    
                                    <CardDiv onClick={()=> setView('enter-phonenumber')}>
                                        <IoIosContact className='text-3xl h-full'/>
                                        <span className='text-sm text-center tracking-wider font-semibold text-primary-100'>Phone number</span>
                                    </CardDiv>
                                    
                                    <CardDiv onClick={()=> setView('enter-callbackurl')}>
                                        {/* <div className='h-full w-full flex flex-col items-center justify-center'>
                                            <span className='text-sm tracking-wide font-medium break-all'>http://localhost:4000/faulu-ussd/</span>
                                        </div> */}
                                        <ImAttachment className='text-xl h-full'/>
                                        <span className='text-sm tracking-wider font-semibold text-primary-100'>Callback URL</span>
                                    </CardDiv>
                                    
                                    <CardDiv onClick={()=> setView('enter-imsi')}>
                                        <MdPrivacyTip className='text-2xl h-full'/>
                                        <span className='text-sm tracking-wider font-semibold text-primary-100'>IMSI</span>
                                    </CardDiv>
                                </div>
                            </>
                        )
                    }
                    {
                        view === 'dial' && (
                            <div className='relative w-full h-full'>
                                <div className='w-full h-full flex flex-col items-center justify-end pb-10'>
                                    <>
                                        <InputDiv className='w-full text-center border-b border-gray-200 h-6 pb-2 text-base tracking-wider font-medium'>
                                            {dialInput}
                                        </InputDiv>

                                        <div className='w-full pt-3 flex flex-wrap'>
                                            {
                                                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((item, index) => (
                                                    <div className='w-1/3 py-2 flex flex-col items-center justify-center font-medium text-primary-100 text-xl' key={index}>
                                                        <span className='flex flex-col items-center justify-start cursor-pointer px-3'
                                                            onClick={() => updateDialInput(item)}>
                                                            {item}
                                                            <span  className='uppercase text-xs' key={`cdcd${index}`}>{['~', 'ABC', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz', '', '+', ''][index]}</span>
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='w-full flex items-center justify-center'>
                                            <div className='bg-successColor p-2 rounded-full cursor-pointer' onClick={sendToCallback}>
                                                <MdLocalPhone className='text-xl text-gray-100'/>
                                            </div>
                                            {
                                                dialInput && (
                                                    <div className='absolute right-0 p-2 rounded-full cursor-pointer' onClick={deleteLastInput}>
                                                        <RiDeleteBack2Fill className='text-xl text-primary-100'/>
                                                    </div>
                                                )
                                            }
                                            {
                                                !dialInput && (
                                                    <div className='absolute right-0 p-2 rounded-full cursor-pointer' onClick={()=> setView('home')}>
                                                        <TiHome className='text-xl text-primary-100'/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                </div>
                                <Modal
                                    showModal = { showModal }
                                    loading = {loadingState}
                                    loadingText = 'USSD code running'
                                >
                                    <div className='w-full h-full text-base tracking-wide'>
                                        <div dangerouslySetInnerHTML={{ __html: `${responseBody.replace(/END /, '').replace(/CON /, '').replace(/\n/g, '<br/>')}` }}/>

                                        { 
                                            responseBody.startsWith('CON') && (
                                                <LabelInput 
                                                className='w-full pl-2 mt-2 border-b-2 h-9 focus:outline-none active:outline-none focus:border-primary-100' 
                                                value={ussdBody} 
                                                onChange={(e) => { e.preventDefault(); setUssdBody(e.target.value)}} 
                                                autoFocus
                                                onKeyUp     = {  e => {
                                                    if ( e.keyCode === 13 ) {
                                                        submit()
                                                    }
                                                }} />
                                            )
                                        }

                                        <div className='flex items-center justify-end mt-4 text-lg font-semibold tracking-wide text-secondary-200'>
                                            <span className='cursor-pointer opacity-80 hover:opacity-100' onClick= {()=> setShowModal(false)}>{ responseBody.startsWith('CON') ? 'CANCEL' : 'OK' }</span>
                                            {
                                                responseBody.startsWith('CON') && (
                                                    <span className='cursor-pointer ml-5 opacity-80 hover:opacity-100' onClick={submit}>SEND</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        )
                    }
                </MainDiv>
            </Container>
        </div>
    </MainLayout>
  )
}

const Container = styled.div`
    width: 320px;
    height: 640px;
    border: 16px black solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;
`;

const MainDiv = styled.div`
    background-color: ${props => props.theme.bgColor};
`;

const CardDiv = styled.div`
    ${tw`w-32 h-28 mt-3 rounded shadow-sm p-3 flex flex-col items-center justify-center cursor-pointer`};
    background-color: ${props => props.theme.lightColor};
    color: ${props => props.theme.textColor};
`;

const UssdDiv = styled.div`
    ${tw`w-32 h-28 mt-3 rounded shadow-sm p-3 flex flex-col items-center justify-center`};
    background-color: ${props => props.theme.lightColor};
    color: ${props => props.theme.textColor};
    cursor: ${p => p.allowdial ? 'pointer' : 'not-allowed'};
`;

const InputDiv = styled.div`
    color: ${props => props.theme.textDark};
`;

const LabelInput = styled.input`
    border-color: ${p => p.theme.borderColor};
    background: transparent;
`;

const HomeDiv = styled.div`
    background-image    : url('/images/wallp.jpg');
    background-color: ${props => props.theme.bgColor};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export default Simulator