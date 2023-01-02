import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { withRouter } from "react-router-dom"
import { isEmpty, map } from "lodash"
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard"

import "../../assets/scss/tasks.scss"
import { getKanbanboards as onGetKanbanBoards } from "../../slices/thunks"

//import images
import logoSm from "../../assets/images/logo-sm.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";

const KanbanBoard = (props: any) => {
  const dispatch = useDispatch();

  const { kanbanboards } = useSelector((state: any) => ({
    kanbanboards: state.kanbanboards.kanbanboards,
  }));

  useEffect(() => {
    if (kanbanboards && !kanbanboards.length) {
      dispatch(onGetKanbanBoards());
    }
  }, [dispatch, kanbanboards]);

  const data = map(kanbanboards, kanbanboard => ({ ...kanbanboard, cards: kanbanboard.tasks }))

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Kanban Board | Dashonic - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Apps" breadcrumbItem="Kanban Board" />
          {!isEmpty(data) && (
            <React.Fragment>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody className="p-4">
                      <div className="border-bottom pb-4 mb-4">
                        <Row>
                          <Col sm={6}>
                            <div className="d-flex">
                              <div className="avatar flex-shrink-0 me-3">
                                <div className="avatar-title bg-light rounded-circle">
                                  <img src={logoSm} alt="" height="28" />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="font-size-16 mb-1">Dashonic Admin Dashboard</h5>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet adipiscing elit</p>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="mt-4 mt-sm-0">
                              <div className="avatar-group justify-content-sm-end">
                                <div className="avatar-group-item">
                                  <Link to="#" className="d-block" data-bs-toggle="tooltip" data-placement="top" title="Emily Surface">
                                    <div className="avatar-sm">
                                      <div className="avatar-title rounded-circle bg-primary">
                                        E
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                                <div className="avatar-group-item">
                                  <Link to="#" className="d-block" data-bs-toggle="tooltip" data-placement="top" title="James Scott">
                                    <div className="avatar-sm">
                                      <img src={avatar2} alt="" className="img-fluid rounded-circle" />
                                    </div>
                                  </Link>
                                </div>
                                <div className="avatar-group-item">
                                  <Link to="#" className="d-block" data-bs-toggle="tooltip" data-placement="top" title="Lynn Hackett">
                                    <div className="avatar-sm">
                                      <div className="avatar-title rounded-circle bg-info">
                                        L
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                                <div className="avatar-group-item">
                                  <Link to="#" className="d-block" data-bs-toggle="tooltip" data-placement="top" title="Add New">
                                    <div className="avatar-sm">
                                      <div className="avatar-title rounded-circle bg-light text-primary">
                                        <i className="mdi mdi-plus fs-5"></i>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <UncontrolledBoard board={{ columns: data }} content={kanbanboards} />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(KanbanBoard);