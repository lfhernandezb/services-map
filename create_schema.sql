-- Create Host table
CREATE TABLE Host (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    ip_address NVARCHAR(15) NOT NULL,
    type NVARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create FrontendService table
CREATE TABLE FrontendService (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create FrontEndServiceHost table
CREATE TABLE FrontEndServiceHost (
    id INT PRIMARY KEY IDENTITY(1,1),
    host_id INT NOT NULL,
    frontendservice_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (host_id) REFERENCES Host(id),
    FOREIGN KEY (frontendservice_id) REFERENCES FrontendService(id)
);

-- Create BackendService table
CREATE TABLE BackendService (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create BackEndServiceHost table
CREATE TABLE BackEndServiceHost (
    id INT PRIMARY KEY IDENTITY(1,1),
    host_id INT NOT NULL,
    backendservice_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (host_id) REFERENCES Host(id),
    FOREIGN KEY (backendservice_id) REFERENCES BackendService(id)
);

-- Create DBEngineType table
CREATE TABLE DBEngineType (
    id INT PRIMARY KEY IDENTITY(1,1),
    description NVARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create DBEngine table
CREATE TABLE DBEngine (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    host_id INT NOT NULL,
    dbenginetype_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (host_id) REFERENCES Host(id),
    FOREIGN KEY (dbenginetype_id) REFERENCES DBEngineType(id)
);

-- Create DBSchema table
CREATE TABLE DBSchema (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    dbengine_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (dbengine_id) REFERENCES DBEngine(id)
);

-- Create DBQuery table
CREATE TABLE DBQuery (
    id INT PRIMARY KEY IDENTITY(1,1),
    query NVARCHAR(256) NOT NULL,
    dbschema_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (dbschema_id) REFERENCES DBSchema(id)
);

-- Create API table
CREATE TABLE API (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    method NVARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE')),
    path NVARCHAR(100) NOT NULL,
    backend_service_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (backend_service_id) REFERENCES BackendService(id)
);

-- Create APIConsumption table
CREATE TABLE APIConsumption (
    id INT PRIMARY KEY IDENTITY(1,1),
    consumer_type NVARCHAR(50) NOT NULL CHECK (consumer_type IN ('frontend', 'backend')),
    consumer_id INT NOT NULL,
    backend_service_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (backend_service_id) REFERENCES BackendService(id),
);

-- Create BackendToDBAccess table
CREATE TABLE BackendToDBAccess (
    id INT PRIMARY KEY IDENTITY(1,1),
    backend_service_id INT NOT NULL,
    dbschema_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (backend_service_id) REFERENCES BackendService(id),
    FOREIGN KEY (dbschema_id) REFERENCES DBSchema(id)
);