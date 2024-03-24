import React from 'react';

const Sbobinatura = ({sbobinatura}) => {
    return (
        <div>
            {sbobinatura === "loading" ? (
                <span className="loading loading-dots loading-lg"></span>
            ) : (
                <div
                    className="max-w-md text-xl font-normal text-white "
                    style={{ whiteSpace: "pre-line" }}
                >
                    {sbobinatura}
                </div>
            )}
        </div>
    );
};

export default Sbobinatura;