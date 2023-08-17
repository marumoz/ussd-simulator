import { createGlobalStyle } from 'styled-components';
import style from 'styled-theming';

const getBackground = style('mode', {
    light: '#f9fafb',
    dark: '#111827'
});

const getForeground = style('mode', {
    light: '#111827',
    dark: '#f9fafb'
});

const getFontFam = style('mode', {
    light: 'nunito',
    dark: 'lato'
});

const getFontSrc = style('mode', {
    light: 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900',
    dark: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900'
});

const getFontSize = style('textZoom', {
  normal: '12px',
  magnify: '14px'
})

const GlobalStyle = createGlobalStyle`
a:hover,a:active, a:visited, a:focus {
	text-decoration:none;
	color:inherit
}
@font-face {
    font-family: 'nunito';
    src        : url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900');
};
body {
    background-color: ${getBackground};
    color: ${getForeground};
    font-size: ${getFontSize};
    width: 100%;
    font-family: ${getFontFam};
    @font-face {
        font-family: ${getFontFam};
        src        : url(${getFontSrc});
    };
}
  
/* rsuite overrrides */
.rs-modal-backdrop.in {
	//opacity: .1 !important;
}
.fade:not(.show) {
	opacity: .5 !important;
}
.rs-modal {
    margin-top: 10%;
    @media only screen and (max-width: 640px){
        margin-top: 30%;
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }
}
.rs-modal-content {
	/* background-color: #ffffff !important; */
	//border-radius: 0 !important;
	background: ${getBackground};
}
.modal-button-wrapper {
	display: flex;
	justify-content: flex-start;
	border-top: 1px solid #ececec7d;
	padding-top: 20px;
}
.rs-message {
    border-radius: 6px;
    font-size: 12px;
    line-height: 1.42857143;
    position: relative;
    margin-bottom: 20px;
}
::-webkit-scrollbar {
	width: 7px;
	margin-right:5px;
	background   : transparent;
}	
::-webkit-scrollbar-track {
	border-radius: 30px;
}	
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background   : grey;
}

/** Classes for the displayed toast **/
/** Used to define container behavior: width, position: fixed etc... **/
.Toastify__toast-container {
}
.Toastify__toast {
}
.Toastify__toast--rtl {
}
.Toastify__toast--dark {
}
.Toastify__toast--default {
}
.Toastify__toast--info {
}
.Toastify__toast--success {
}
.Toastify__toast--warning {
}
.Toastify__toast--error {
}
.Toastify__toast-body {
}

.bp3-input, .bp3-input:focus, .bp3-input.bp3-active {
    box-shadow: none !important
}
`;

export default GlobalStyle;