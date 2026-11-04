# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | varchar unique | False | — | False |
| password_hash | varchar | False | — | False |
| role | varchar | False | — | False |
| full_name | varchar | False | — | False |
| phone | varchar | False | — | True |
| created_at | timestamptz | False | — | False |

### organizer_profiles

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| organization_name | varchar | False | — | False |
| contact_details | varchar | False | — | True |

### consent_records

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| purposes | jsonb | False | — | False |
| notice_version | varchar | False | — | False |
| consent_given | boolean | False | — | False |
| granted_at | timestamptz | False | — | False |
| withdrawn_at | timestamptz | False | — | True |

### events

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| organizer_id | uuid | False | users.id | False |
| title | varchar | False | — | False |
| venue | varchar | False | — | False |
| city | varchar | False | — | False |
| category | varchar | False | — | False |
| description | text | False | — | False |
| starts_at | timestamptz | False | — | False |
| poster_url | varchar | False | — | True |
| status | varchar | False | — | False |
| created_at | timestamptz | False | — | False |

### ticket_types

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| event_id | uuid | False | events.id | False |
| name | varchar | False | — | False |
| price_inr | numeric | False | — | False |
| quantity_total | integer | False | — | False |
| quantity_sold | integer | False | — | False |

### orders

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| attendee_id | uuid | False | users.id | False |
| event_id | uuid | False | events.id | False |
| status | varchar | False | — | False |
| total_amount_inr | numeric | False | — | False |
| razorpay_order_id | varchar | False | — | True |
| created_at | timestamptz | False | — | False |

### order_items

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| order_id | uuid | False | orders.id | False |
| ticket_type_id | uuid | False | ticket_types.id | False |
| quantity | integer | False | — | False |
| unit_price_inr | numeric | False | — | False |

### tickets

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| order_id | uuid | False | orders.id | False |
| ticket_type_id | uuid | False | ticket_types.id | False |
| qr_code_id | uuid unique | False | — | False |
| qr_image_url | varchar | False | — | True |
| status | varchar | False | — | False |
| issued_at | timestamptz | False | — | True |

### payments

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| order_id | uuid | False | orders.id | False |
| razorpay_payment_id | varchar | False | — | True |
| amount_inr | numeric | False | — | False |
| status | varchar | False | — | False |
| created_at | timestamptz | False | — | False |

### audit_logs

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| actor_user_id | uuid | False | users.id | True |
| action | varchar | False | — | False |
| entity | varchar | False | — | False |
| entity_id | varchar | False | — | True |
| ip_address | varchar | False | — | True |
| created_at | timestamptz | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | organizer_profiles | one-to-one |
| users | consent_records | one-to-many |
| users | events | one-to-many |
| events | ticket_types | one-to-many |
| users | orders | one-to-many |
| events | orders | one-to-many |
| orders | order_items | one-to-many |
| ticket_types | order_items | one-to-many |
| orders | tickets | one-to-many |
| orders | payments | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar_unique email
    varchar password_hash
    varchar role
    varchar full_name
    varchar phone
    timestamptz created_at
  }
  organizer_profiles {
    uuid id PK
    uuid user_id FK
    varchar organization_name
    varchar contact_details
  }
  consent_records {
    uuid id PK
    uuid user_id FK
    jsonb purposes
    varchar notice_version
    boolean consent_given
    timestamptz granted_at
    timestamptz withdrawn_at
  }
  events {
    uuid id PK
    uuid organizer_id FK
    varchar title
    varchar venue
    varchar city
    varchar category
    text description
    timestamptz starts_at
    varchar poster_url
    varchar status
    timestamptz created_at
  }
  ticket_types {
    uuid id PK
    uuid event_id FK
    varchar name
    numeric price_inr
    integer quantity_total
    integer quantity_sold
  }
  orders {
    uuid id PK
    uuid attendee_id FK
    uuid event_id FK
    varchar status
    numeric total_amount_inr
    varchar razorpay_order_id
    timestamptz created_at
  }
  order_items {
    uuid id PK
    uuid order_id FK
    uuid ticket_type_id FK
    integer quantity
    numeric unit_price_inr
  }
  tickets {
    uuid id PK
    uuid order_id FK
    uuid ticket_type_id FK
    uuid_unique qr_code_id
    varchar qr_image_url
    varchar status
    timestamptz issued_at
  }
  payments {
    uuid id PK
    uuid order_id FK
    varchar razorpay_payment_id
    numeric amount_inr
    varchar status
    timestamptz created_at
  }
  audit_logs {
    uuid id PK
    uuid actor_user_id FK
    varchar action
    varchar entity
    varchar entity_id
    varchar ip_address
    timestamptz created_at
  }
  users ||--|| organizer_profiles : "one-to-one"
  users ||--o{ consent_records : "one-to-many"
  users ||--o{ events : "one-to-many"
  events ||--o{ ticket_types : "one-to-many"
  users ||--o{ orders : "one-to-many"
  events ||--o{ orders : "one-to-many"
  orders ||--o{ order_items : "one-to-many"
  ticket_types ||--o{ order_items : "one-to-many"
  orders ||--o{ tickets : "one-to-many"
  orders ||--o{ payments : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
