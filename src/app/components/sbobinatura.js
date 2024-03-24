import React from 'react';

const Sbobinatura = ({sbobinatura}) => {
    return (
        <div>
            {sbobinatura ? (
                <div
                    className="max-w-md text-xl font-normal text-white "
                    style={{ whiteSpace: "pre-line" }}
                >
                    {sbobinatura}
                </div>
            ) : (
                <div
                    className="max-w-md text-xl font-normal text-white "
                    style={{ whiteSpace: "pre-line" }}
                ></div>
            )}
        </div>
    );
};

export default Sbobinatura;