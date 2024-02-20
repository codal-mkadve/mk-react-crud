import { Alert, BreadcrumbItem, Breadcrumb as BC } from "react-bootstrap";

const Breadcrumb = ({ data }) => {
  return (
    <>
      <Alert variant="dark" className="breadcrumbs">
        <BC as="nav">
          {data &&
            data.length &&
            data.map(({ id, item, isActive }) => (
              <BreadcrumbItem key={id} active={isActive}>
                {item}
              </BreadcrumbItem>
            ))}
        </BC>
      </Alert>
    </>
  );
};

export default Breadcrumb;
