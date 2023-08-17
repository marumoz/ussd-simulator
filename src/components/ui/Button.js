import { Spin }                 from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';
import styled 				    from 'styled-components';
import tw                       from 'twin.macro';

const Button = ({ primary, secondary, outlined, danger, sm, lg, loading = false, callback = () => { }, grayIn, children }) => {

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffffff" }} spin />

    return (
        <StyledButton type = "button" primary = {primary} secondary = {secondary} outlined = {outlined} danger = {danger} greyb = {grayIn} onClick = {callback} sm = {sm}>
            { loading ? <Spin indicator={antIcon} size= "small"/> : children }
        </StyledButton>
    )
};

const StyledButton = styled.button`
    ${tw`flex items-center justify-center w-40 text-sm font-bold text-center capitalize rounded-md shadow-none outline-none cursor-pointer active:outline-none hover:opacity-80 focus:outline-none`};
    color: ${p => p.theme.themeColor};
    ${p => p.primary && !p.outlined ? tw`border-2 border-transparent bg-primary-100` : ''};
    ${p => p.secondary && !p.outlined ? tw`border-2 border-transparent bg-secondary-100` : ''};
    ${p => p.outlined && p.secondary ? tw`bg-transparent border-2 border-secondary-100 text-secondary-100` : ''};
    ${p => p.outlined && p.primary ? tw`bg-transparent border-2 border-primary-100 text-primary-100` : ''};
    ${p => p.danger && !p.outlined ? tw`border-2 border-transparent bg-danger` : ''};
    ${p => p.outlined && p.danger ? tw`bg-transparent border-2 border-danger text-danger` : ''};
    ${p => p.sm ? tw`py-1` : tw`py-1 sm:py-2` };
    ${p => p.greyb ? {background: '#D8D8D8', color: '#5D6065', border: '2px', borderColor: 'transparent'} : ''};
    transition: "all .15s ease";
`;

export default Button