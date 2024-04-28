import React from "react";
import { useSymbols } from "./Context/Symbol";
const Parties = () => {
  let [symbols] = useSymbols();
  return (
    <>
      <h2 className=" display-7 text-start ">Registered Parties</h2>
      <div className=" d-flex justify-content-center align-items-center flex-wrap ">
        {symbols &&
          symbols.map((value, index) => {
            return (
              <div className=" m-2 " style={{ width: "260px" }}>
                <div>
                  <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>
                    <div class="card testimonial-card mt-2 mb-3">
                      <div
                        className=" w-100 overflow-hidden "
                        style={{ height: "120px" }}
                      >
                        <img
                          src={value.image[0].url}
                          class="card-up w-100 h-auto position-relative"
                          style={{ top: "-20%" }}
                          alt="woman avatar"
                        />
                      </div>
                      <div class="avatar mx-auto white">
                        <img
                          src={value.image[1].url}
                          class="rounded-circle img-fluid position-relative w-100  h-100 "
                          alt="woman avatar"
                          style={{ background: "cover" }}
                        />
                      </div>
                      <div class="card-body text-center">
                        <h4 class="card-title font-weight-bold">
                          {value.party_name}
                        </h4>
                        <hr />
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          className=" overflow-hidden"
                        >
                          <i class="fas fa-quote-left"></i>
                          <span className=" fw-bold ">
                            {" "}
                            {value.symbol_name}
                          </span>{" "}
                          is the Election Symbol Of this party
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Parties;
