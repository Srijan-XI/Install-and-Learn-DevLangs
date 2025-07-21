# Class with Private Attributes
class Car:
    def __init__(self, brand, price):
        self.__brand = brand
        self.__price = price

    def get_brand(self):
        return self.__brand

c = Car("Toyota", 1500000)
print(c.get_brand())
# print(c.__brand) # Will cause AttributeError
# The above line is commented out to prevent an error
# The private attribute __brand cannot be accessed directly outside the class   