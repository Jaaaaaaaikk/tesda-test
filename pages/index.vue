<template>
    <div class="p-6">
        <!-- Inventory Stock Card Table -->
        <div class="overflow-x-auto shadow-2xl p-4 rounded-lg bg-amber-100">
            <span class="flex text-center text-2xl">SMAW</span>

            <div class="flex justify-end relative">
                <!-- Dropdown -->
                <select v-model="selectedOrder"
                    class="border border-gray-300 p-3 text-sm rounded-lg bg-white cursor-pointer">
                    <option value="">-- Select Purchase Order --</option>
                    <option v-for="order in purchaseOrderName" :key="order" :value="order">{{ order }}</option>
                </select>

                <!-- Trainer List -->
                <div v-if="filteredTrainers.length > 0"
                    class="absolute right-10 top-20 mt-2 w-64 bg-white p-3 rounded-lg shadow-md border border-gray-300">
                    <h3 class="text-lg font-semibold mb-2">Trainers who received {{ selectedOrder }}</h3>
                    <ul class="list-disc pl-5">
                        <li v-for="trainer in filteredTrainers" :key="trainer.id" class="text-gray-700">
                            {{ trainer.name }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Entity Name, Item, Description, and Unit of Measurement -->
            <table class="border border-gray-300 shadow-lg mt-4">
                <tbody>
                    <tr v-for="field in entityDetails" :key="field.id" class="odd:bg-white even:bg-gray-50">
                        <td class="border border-gray-300 p-2">{{ field.name }}</td>
                        <td class="border border-gray-300 p-2">
                            <template v-if="field.id === 1">
                                <select v-model="field.type" class="w-full p-1 border border-gray-300 rounded">
                                    <option value="">-- Select Entity Name --</option>
                                    <option v-for="department in departments" :key="department.department_id" :value="department.name">{{ department.name }}</option>
                                </select>
                            </template>
                            <template v-else>
                                {{ field.name }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Inventory Table -->
            <table class="border border-gray-300 shadow-lg mt-4">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-300 p-2">Date</th>
                        <th class="border border-gray-300 p-2">Reference</th>
                        <th class="border border-gray-300 p-2">Receipt Quantity</th>
                        <th class="border border-gray-300 p-2">Issue</th>
                        <th class="border border-gray-300 p-2">Remaining Item Unused</th>
                        <th class="border border-gray-300 p-2">Number of Days to Consume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in items" :key="item.id" class="odd:bg-white even:bg-gray-50">
                        <td class="border border-gray-300 p-2">
                            <input v-model="item.date" type="date" class="w-full p-1 border border-gray-300 rounded" />
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-model="item.reference" class="w-full p-1 border border-gray-300 rounded"
                                placeholder="Enter reference" />
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-model.number="item.receiptQuantity" type="number"
                                class="w-full p-1 border border-gray-300 rounded" />
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-model.number="item.issue" type="number"
                                class="w-full p-1 border border-gray-300 rounded" />
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-model.number="item.remainingUnused" type="number"
                                class="w-full p-1 border border-gray-300 rounded" />
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-model.number="item.daysToConsume" type="number"
                                class="w-full p-1 border border-gray-300 rounded" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7" class="border border-gray-300 p-2 text-center">
                            <button @click="addRow" class="p-2 bg-blue-500 text-white rounded">Add Row</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import axios from 'axios';

const purchaseOrderName = ref(["Order 1", "Order 2", "Order 3"]);
const selectedOrder = ref("");

// Sample data of trainers who received purchase orders
const trainers = ref([
    { id: 1, name: "John Doe", purchaseOrder: "Order 1" },
    { id: 2, name: "Jane Smith", purchaseOrder: "Order 2" },
    { id: 3, name: "Mark Johnson", purchaseOrder: "Order 1" },
    { id: 4, name: "Emily Brown", purchaseOrder: "Order 3" }
]);

// Computed property to filter trainers based on the selected purchase order
const filteredTrainers = computed(() => {
    return trainers.value.filter(trainer => trainer.purchaseOrder === selectedOrder.value);
});

// Entity details section
const entityDetails = reactive([
    { id: 1, name: 'Entity Name', type: '' },
    { id: 2, name: 'Item', type: '' },
    { id: 3, name: 'Description', type: '' },
    { id: 4, name: 'Unit of Measurement', type: '' }
]);

const items = reactive([
    { id: 1, date: '', reference: '', receiptQuantity: '', issue: '', remainingUnused: 0, daysToConsume: '' }
]);

const addRow = () => {
    items.push({ id: items.length + 1, date: '', reference: '', receiptQuantity: '', issue: '', remainingUnused: 0, daysToConsume: '' });
};

// Fetch departments from the API
const departments = ref([]);
const fetchDepartments = async () => {
    try {
        const response = await axios.get('/api/departments');
        departments.value = response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

onMounted(() => {
    fetchDepartments();
});

// Reset the dropdown when it loses focus (clicks outside)
const resetDropdown = () => {
    if (!selectedOrder.value) {
        selectedOrder.value = "";
    }
};
</script>

<style scoped></style>
