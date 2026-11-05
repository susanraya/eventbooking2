package app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/** The audit_logs table, from the approved data model. */
@Entity
@Table(name = "audit_logs")
public class AuditLog {

  @Id
  @Column(name = "id", length = 36)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "actor_user_id")
  private User actorUser;

  @Column(name = "action", length = 255, nullable = false)
  private String action;

  @Column(name = "entity", length = 255, nullable = false)
  private String entity;

  @Column(name = "entity_id", length = 255)
  private String entityId;

  @Column(name = "ip_address", length = 255)
  private String ipAddress;

  @Column(name = "outcome", length = 255)
  private String outcome;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public User getActorUser() {
    return actorUser;
  }

  public void setActorUser(User actorUser) {
    this.actorUser = actorUser;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public String getEntity() {
    return entity;
  }

  public void setEntity(String entity) {
    this.entity = entity;
  }

  public String getEntityId() {
    return entityId;
  }

  public void setEntityId(String entityId) {
    this.entityId = entityId;
  }

  public String getIpAddress() {
    return ipAddress;
  }

  public void setIpAddress(String ipAddress) {
    this.ipAddress = ipAddress;
  }

  public String getOutcome() {
    return outcome;
  }

  public void setOutcome(String outcome) {
    this.outcome = outcome;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
