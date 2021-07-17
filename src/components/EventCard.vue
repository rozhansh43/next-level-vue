<template>
  <router-link class="event-link" :to="{ name: 'event-show', params: { id: event.id } }">
    <div class="event-card -shadow">
      <span class="eyebrow">
        @{{ event.time }} on {{ event.date | date }}
      </span>

      <h4 class="title">
        {{ event.title }}
      </h4>

      <BaseIcon name="users">
        {{ event.attendees.length }} attending
      </BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>

