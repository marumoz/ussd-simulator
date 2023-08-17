import React from "react";
import styled      from 'styled-components';
import tw              from 'twin.macro';
import { Spin }                 from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';

export default function Modal({ showModal = false, setShowModal, loading, loadingText, children }) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#fcb103" }} spin />

  return (
    <>
      {showModal ? (
        <>
            <div tw="absolute top-0 inset-0 w-full h-full z-2">
            <div tw="flex items-center justify-center w-full h-full px-4 py-4 text-center">
                
                <div tw="absolute bottom-0 w-full h-full transition-opacity" onClick={() => {}} aria-hidden="true">
                <div tw="absolute bottom-0 w-full h-full bg-gray-500 opacity-75"></div>
                </div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                {/* <span tw="hidden sm:inline-block sm:align-middle sm:h-full" aria-hidden="true">&#8203;</span> */}
                
                {
                    loading && (
                        <LoadDiv>
                            <Spin indicator={antIcon} size= "small"/>
                            <span className="ml-5 text-sm font-normal tracking-wide">{loadingText}</span>
                        </LoadDiv>
                    )
                }
                { 
                    !loading && (
                        <Container role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                
                            {/* {BODY} */}
                            <div tw = "p-3">
                                {children}
                            </div>
                        </Container>
                    )
                }
            </div>
            </div>

        </>
      ) : null}
    </>
  );
}

const Container = styled.div`
    ${tw`relative inline-block w-full overflow-hidden text-left align-middle transition-all transform rounded-md shadow-xl`};
    background: ${p => p.theme.bgColor};
    //max-height: 350px;
    //min-height: 201px;
`;

const LoadDiv = styled.div`
    ${tw`relative h-12 w-full flex items-center justify-center overflow-hidden text-left align-middle transition-all transform rounded shadow-xl`};
    background: ${p => p.theme.bgColor};
`;