import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";

const Summary = (props: any) => {
  const [summarys, setSummarys] = useState<any[]>([
    {
      id: 1,
      icon: "fas fa-user",
      title: "유저 수",
      counting: props.data.user,
      // counting: props.data.user,
    },
    {
      id: 2,
      icon: "fas fa-chart-area",
      title: "총 등록 건강식품",
      counting: props.data.total,
      // counting: props.data.total,
    },
  ]);

  useEffect(() => {}, []);

  if (!summarys.length) {
    return null;
  }

  return (
    <React.Fragment>
      <Card>
        <div>
          <ul className="list-group list-group-flush">
            {summarys.map((summary: any, key: number) => (
              <li className="list-group-item" key={key}>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle font-size-12">
                        <i className={summary["icon"]}></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted mb-1">{summary["title"]}</p>
                    <h5 className="font-size-16 mb-0">{summary["counting"]}</h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Summary;
